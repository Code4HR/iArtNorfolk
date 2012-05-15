<?php
/* ************************************************************************

   Copyright: (c) 2012 Clynton Caines

   License: All Rights Reserved

   Authors: Clynton Caines

************************************************************************ */

// allow others to access the data - and me to test from the desktop
header('Access-Control-Allow-Origin: *');

$mainArtImportXMl = 'http://www.norfolk.gov/cultural_affairs/public_art_downtown.xml';


// -------------------------------------------------------------------------------
// Main stuff - load the import file then do useful stuff with it

// Use cURL to get the XML feed into a PHP string variable.
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $mainArtImportXMl);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$xml = curl_exec($ch);
curl_close($ch);

if (isset($xml) && $xml != "") {
	$parks = simplexml_load_string($xml);

	if (isset($parks)) {

		$items = array();

		$wantDetail = $_GET["detail"]; // 'lng-76.29367858171463lat36.85602296216651'; // test

		if (isset($wantDetail) && $wantDetail !== "") { /* this was a request for details - get it */

			$idParts = split('lat', str_replace('lng', '', $wantDetail));

			$item = $parks->xpath("//parkz[@lng='" . $idParts[0] . "'][@lat='" . $idParts[1] . "']");

			if (isset($item)) {
				$items[] = GenerateJSONForItem($item[0], true);
			}

		} else { /* return the entire data set */

			foreach ($parks->parkz as $parkz) {
				$items[] = GenerateJSONForItem($parkz);
			}
		}
	}

	if (isset($items) && isset($items[0]))
	{
		if (isset($wantDetail) && $wantDetail !== "") { /* this was a request for details - get just that */
			$results = $items[0];
		} else { /* return the entire data set as a Collection */
			$results = array(
				"type" => "FeatureCollection" ,
				"features" => $items);
		}

		header('Content-type: text/json');
		header('Content-type: application/json');

		$pattern = array(',"', '{', '}');
		$replacement = array(",\n\t\"", "{\n\t", "\n}");
		$results = str_replace($pattern, $replacement, '' . json_encode($results));

		//$results = html_ entity_ decode($results);
		$results = str_replace("\\/", "/", $results);

		//echo "<pre>" ;

		echo $results;

		//echo "</pre>" ;

		//var_dump($results);
	}

}



function GenerateJSONForItem($parkz, $showDetail = false)
{

	if ($parkz === NULL || $parkz === '') { return; }
	$details = '';

	$detailUrl = str_replace('a href=\'', '', $parkz['link']);
	$detailUrl = substr( $detailUrl, 0, strlen( $detailUrl ) - 1 ); //strip out last quote

	// generic image - will try to get a better one if doing details
	$imageUrl = str_replace("img src='", "", '' . $parkz['img']);
	$imageUrl = split("eeeeee", str_replace("' alt='", "eeeeee", '' . $imageUrl));
	$imageUrl = $imageUrl[0];

	if ($showDetail && $detailUrl != '') 
	{
		$detailsTextAndImage = GetDetailsFromUrl($detailUrl);
		if (isset($detailsTextAndImage))
		{
			if (isset($detailsTextAndImage[0]))
			{
				$details = $detailsTextAndImage[0];
			}

			if (isset($detailsTextAndImage[1]) && $detailsTextAndImage[1] != '')
			{
				$imageUrl = $detailsTextAndImage[1];
			}
		}

	}

	$id = 'lng' . $parkz['lng'] . 'lat' . $parkz['lat'];
	$lat = '' . $parkz['lat'];
	$lng = '' . $parkz['lng'];

	$coordinates = array($lng, $lat);

	$geometry = array(
		"type" => "Point",
		"coordinates" => $coordinates
	);


	$properties = array(
		"_id" => $id,
		"Title" => '' . $parkz['title'],
		"Description" => '' . $details,
		"Image" => $imageUrl,
		"Artists" => '' . $parkz['artist'],
		"Location" => '' . $parkz['loc'],
		"Link" => $detailUrl
	);


	$results = 
		array(
			"type" => "Feature",
			"geometry" => $geometry,
			"properties" => $properties
		);

	return $results;
}

function GetDetailsFromUrl($originalUrl) {

	$detailUrl = urlencode($originalUrl);
	//$detailUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" . $detailUrl . "%22%20and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22mainContent%22%5D'&format=json&diagnostics=true&callback=cbfunc";
	$detailUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" . $detailUrl . "%22%20and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22mainContent%22%5D'&format=json&diagnostics=false";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $detailUrl);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$data = curl_exec($ch);
	curl_close($ch);

	$object = json_decode( $data, true );

	$detailParags = $object["query"]["results"]["div"]["table"]["tr"][2]["td"]["table"]["tr"]["td"][1]["p"];

	$detailImage = $object["query"]["results"]["div"]["table"]["tr"][2]["td"]["table"]["tr"]["td"][0]["a"][1]["href"];

	$detailImage = resolve_url($originalUrl, $detailImage);

	if (is_array($detailParags))
	{
		$details = "<p>" . implode("</p><p>", $detailParags) . "</p>";
	} else {
		$details = "<p>" . $detailParags . "</p>";
	}	

	$details = str_replace("\'", "&quote;", $details);
	// $details = htmlentities($details, ENT_QUOTES);

	return array($details, $detailImage);
}

/**
 * Resolve a URL relative to a base path. This happens to work with POSIX
 * filenames as well. This is based on RFC 2396 section 5.2.
 */
function resolve_url($base, $url) {
        if (!strlen($base)) return $url;
        // Step 2
        if (!strlen($url)) return $base;
        // Step 3
        if (preg_match('!^[a-z]+:!i', $url)) return $url;
        $base = parse_url($base);
        if ($url{0} == "#") {
                // Step 2 (fragment)
                $base['fragment'] = substr($url, 1);
                return unparse_url($base);
        }
        unset($base['fragment']);
        unset($base['query']);
        if (substr($url, 0, 2) == "//") {
                // Step 4
                return unparse_url(array(
                        'scheme'=>$base['scheme'],
                        'path'=>substr($url,2),
                ));
        } else if ($url{0} == "/") {
                // Step 5
                $base['path'] = $url;
        } else {
                // Step 6
                $path = explode('/', $base['path']);
                $url_path = explode('/', $url);
                // Step 6a: drop file from base
                array_pop($path);
                // Step 6b, 6c, 6e: append url while removing "." and ".." from
                // the directory portion
                $end = array_pop($url_path);
                foreach ($url_path as $segment) {
                        if ($segment == '.') {
                                // skip
                        } else if ($segment == '..' && $path && $path[sizeof($path)-1] != '..') {
                                array_pop($path);
                        } else {
                                $path[] = $segment;
                        }
                }
                // Step 6d, 6f: remove "." and ".." from file portion
                if ($end == '.') {
                        $path[] = '';
                } else if ($end == '..' && $path && $path[sizeof($path)-1] != '..') {
                        $path[sizeof($path)-1] = '';
                } else {
                        $path[] = $end;
                }
                // Step 6h
                $base['path'] = join('/', $path);

        }
        // Step 7
        return unparse_url($base);
}

function unparse_url($parsed_url) {
  $scheme   = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
  $host     = isset($parsed_url['host']) ? $parsed_url['host'] : '';
  $port     = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
  $user     = isset($parsed_url['user']) ? $parsed_url['user'] : '';
  $pass     = isset($parsed_url['pass']) ? ':' . $parsed_url['pass']  : '';
  $pass     = ($user || $pass) ? "$pass@" : '';
  $path     = isset($parsed_url['path']) ? $parsed_url['path'] : '';
  $query    = isset($parsed_url['query']) ? '?' . $parsed_url['query'] : '';
  $fragment = isset($parsed_url['fragment']) ? '#' . $parsed_url['fragment'] : '';
  return "$scheme$user$pass$host$port$path$query$fragment";
} 

?>


