var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Person = mongoose.model('Person');
var Hobby = mongoose.model('Hobby');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});


/* 
*
*
*
* Rutas para persona 
*
*
*
*
*
*/


router.get('/persons', function(req, res, next){
	
	Person.find(function(err, persons){

		if(err){ return next(err); }

		res.json(persons);
	});
});

router.post('/persons', function(req, res, next){

	var person = new Person(req.body);
	
	person.save(function(err, person){

		if(err){ return next(err); }

		res.json(person);
	});
});


// Esto sirve para que automaticamente se obtenga
// la persona con la ID dada, cuando se haga la peticion
// a la ruta GET /persons/:person
router.param('person', function(req, res, next, id){

	var query = Person.findById(id);

	query.exec(function(err, person){

		if(err) { return next(err); }
		if(!person) { return next(new Error("No se pudo encontrar persona")); }

		req.person = person;
		return next();

	});
});


router.get('/persons/:person', function(req, res, next) {

	// Populate carga los hobbies de la persona (para que no muestre solo las IDs)
	req.person.populate('hobbies', function(err, person){

		if(err) return next(err);

		res.json(person);

	});

});





/* 
*
*
*
* Rutas para Hobby
*
*
*
*
*
*/


router.get('/hobbies', function(req, res, next){
	
	Hobby.find(function(err, hobbies){

		if(err){ return next(err); }

		res.json(hobbies);
	});
});

router.post('/hobbies', function(req, res, next){

	var hobby = new Hobby(req.body);
	
	hobby.save(function(err, hobby){

		if(err){ return next(err); }

		res.json(hobby);
	});
});


router.param('hobby', function(req, res, next, id){

	var query = Hobby.findById(id);

	query.exec(function(err, hobby){

		if(err) { return next(err); }
		if(!hobby) { return next(new Error("No se pudo encontrar hobby")); }

		req.hobby = hobby;
		return next();

	});
});

/* 
*
*
*
* Agregar hobby a persona
*
*
*
*
*
*/


router.post('/persons/:person/hobbies/:hobby', function(req, res, next){

	var person = req.person;
	var hobby = req.hobby;

	// $addToSet actualiza las referencias sin que se dupliquen valores
	Person.update({ _id: person._id }, {
		$addToSet: {
			hobbies: hobby
		}
	}, null, function(err, results){

		if(err) return next(err);

		res.json(results);		
	});
});



module.exports = router;
