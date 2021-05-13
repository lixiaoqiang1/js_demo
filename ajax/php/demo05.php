<?php
$first = $_POST['first'];
$second = $_POST['second'];

$jia = $first+$second;
$jian = $first-$second;
$cheng = $first*$second;
$chu = $first/$second;

$arr = array(
		'jia'=>$jia,
		'jian'=>$jian,
		'cheng'=>$cheng,
		'chu'=>$chu
); 
echo json_encode($arr);
?>