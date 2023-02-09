const movieModel = require('../models/movies');

module.exports= {
    getById: function(req, res ,next){
        console.log(req.body);
        movieModel.findById(req.params.movieId,function(error,movieInfo){
            if(error){
                next(error);

            }
            else{
                res.json({
                    status: "success",
                    message: "Movie found!!",
                    data: {movies: movieInfo}
                });
            }
        });

    },
    getAll: function(req,res, next){
        let moviesList=[];
        movieModel.find({}, function(err,movies){
            if(error){
                next(error);

            }
            else{
                for(let movie of movies){
                    moviesList.push({
                        id: movie._id,
                        name: movie.name,
                        releasedOn: movie.released_on
                    });
                }
                res.json(
                    {
                        status: "success",
                        message: "Movie list found!!",
                        data:{movies: moviesList}
                    }
                );
            }
        });
    },
    updateById: function(req, res, next){
        movieModel.findByIdAndUpdate(req.params.movieId,{name: req.body.name},function(error, movieInfo){
            if(error){
                next(error);
            }
            else{
                req.json({
                    status: "success",
                    message: "Movie updated successfully!!",
                    data : null
                });
            }
        });
    },
    deleteById : function(req, res, next){
        movieModel.findByIdAndRemove(req.params.movieId, function(error, movieInfo){
            if(error){
                next(error);
            }
            else{
                res.json({
                    status : "success",
                    message: "Movie deleted successfully!!",
                    data: null
                });
            }
        });
    },
    create: function(req,res,next){
        movieModel.create({
            name:req.body.name,
            released_on : req.body.released_on
        }, function(error, result){
            if(eror){
                next(error);
            }
            else{
                res.json({
                    status: "success",
                    message: "Movie added successfully!!",
                    data: null
                });
            }
        });
    }

}