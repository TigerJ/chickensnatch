<?php
  /*
  Copyright (c) 2011, Scoroeid 
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Scoreoid nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
  DOCUMENTATION AT: http://wiki.scoreoid.net/
  
  * @Author		Scoroeid
  * @version	1.0.0
  * @Language   PHP 
*/


class ScoreoidProxy {

	//API key
	public $api_key = '7de8a863f2fec1abd48ba6bb067e3d367d10bf5b';
	
	//Game ID
	public $game_id = '7d234e392a';
	
	//Encrption key
	public $encryption_key = '437d5eb5'; 
	
	//Current security setting
	public $security = 0; 
	
	//Base URL
	public $api_url = 'http://www.scoreoid.com/api/';
	
	//API method
	public $response, $method;

	
	function __construct() {
		
		//Get call parameters
		$parameters = $this->_params();
		
		//Set API URL according to params
		$this->api_url .= ! empty($_POST['method']) ? $_POST['method'] : 'getScores';
		if (!empty($_REQUEST['action'])) {
			switch ($_REQUEST['action']) {
				case 'encrypt':
					
					//If encryption is enabled then encrypt and return
					if (!empty($this->security)) {
						echo $this->encrypt($this->encryption_key, serialize($parameters));
					} else {
						echo 'The advanced security is not enabled.';
					}
					break;
				case 'curl_request':
					$curl_parameters = $parameters;
					
					//If encryption is enabled encrypt parameters
					if (!empty($this->security)) {
						$curl_parameters = $this->encrypt($this->encryption_key, serialize($curl_parameters));
					}
					$this->curl_request($curl_parameters);
					break;
			}
		} else {
			die('Please provide the action parameter.');
		}
	}

	//Safe base64encode for URL params
	function safe_b64encode($string) {
		$data = base64_encode($string);
		$data = str_replace(array('+', '/', '='), array('-', '_', ''), $data);
		return $data;
	}

	//Encrypt with encryption key
	function encrypt($key, $string) {
		return $this->safe_b64encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $string, MCRYPT_MODE_CBC, md5(md5($key)))) . '-' . $this->game_id;
	}

	//Prepare parameters
	function _params() {
		
		//Response type
		$this->response = !empty($_POST['response']) ? $_POST['response'] : 'xml';

		//Prepare parameters array
		$parameters = array(
			'api_key' => $this->api_key,
			'game_id' => $this->game_id,
			'response' => $this->response
		);
		
		//Add the other POST parameters
		if (!empty($_POST)) {
			foreach ($_POST as $k => $v) {
				$parameters[$k] = $v;
			}
		}
		return $parameters;
	}

	//Function curl request
	function curl_request($parameters) {
		
		//If parameters are an array url-ify the data for the POST
		if (is_array($parameters)) {
			$params_string = '';
			$n = 1;
			foreach ($parameters as $k => $v) {
				$params_string .= $k . '=' . $v;
				if ($n < count($parameters)) {
					$params_string .= '&';
				}
				$n++;
			}
		} else {
			$params_string = 's=' . $parameters;
		}

		//Init connection
		$ch = curl_init();

		//Set the URL, number of POST vars, POST data
		curl_setopt($ch, CURLOPT_URL, $this->api_url);
		curl_setopt($ch, CURLOPT_POST, is_array($parameters) ? count($parameters) : 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params_string);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		//Execute post
		$result = curl_exec($ch);

		//Close connection
		curl_close($ch);

		return $result;
	}
}

new ScoreoidProxy();
?>