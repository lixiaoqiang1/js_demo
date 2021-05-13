<?php
	header('content-type:text/html; charset=utf-8');
	class Person{
		public $hand = '两只手';
		static $type = '动物';
		const VERSON = '动力1版本';
		function eat (){
			echo '注意echo是在方法体中';
		}
		static function cry(){
			echo '静态方法';
		}
	}
	$p1 = new Person;
	echo $p1 -> hand;
	echo $p1 -> type;
	echo $p1 -> eat();
	echo Person::$type;
	echo Person::VERSON
	
	
	
?>