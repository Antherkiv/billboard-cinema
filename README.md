Billboard cinema
---
First at all, this project is building and not completed yet.

It's intended to be a monorepo that stores microservices written in python:

1. Registration and authentication
2. Movie description
3. Comments (Generic comments)
4. Very simple file handler sever

The server it's implemented with:

1. Falcon
2. Marhsmallow
3. SQLAlchemy
4. JSON Web Token
5. Argon hasher
6. Etc.

The mashup:

1. ES6 - ES7 as loading language
2. React as render engine
3. React Waterfall
4. ReactStrap
5. Formik
7. Slatejs
8. My own slatejs plugins
9. React date picker
10. React drop zone
11. Axios and so...



Steps:
1. Ensure you have or install in your OS:
> Python 3.7
> Postgres 10.5 (Run the server)
1. [Ensure you have installed and cofigured mkvitualenvwrapper (this is a very fast and easy way to have python envs)](https://virtualenvwrapper.readthedocs.io/en/latest/)
2. Make a python virtual environment
```console
	(11:00:01) ~/ ❯❯❯  mkvirtualenv ia
```
3. clone the project and go to the root folder:
```console
	(0:58:23) ~/ ❯❯❯  git clone https://github.com/Antherkiv/billboard-cinema.git
	(0:59:45) ~/ ❯❯❯  cd billboard-cinema
```
5. Install python dependencies:
```console
	(1:00:01) ~/billboard-cinema ❯❯❯  cd microservices && pip install -r requeriments.txt
```
7. Run the servers in this order (it's important to respect the ports the time not allowed me to setup a most robust url responder or put behind nginx to manages the ports).
```console
(1:00:01) ~/billboard-cinema/microservices ❯❯❯ gunicorn auth:api
(1:00:04) ~/billboard-cinema/microservices ❯❯❯ gunicorn gunicorn movies:api -b 0.0.0.0:8001
(1:03:06) ~/billboard-cinema/microservices ❯❯❯ gunicorn gunicorn comments:api -b 0.0.0.0:8002
(1:03:06) ~/billboard-cinema/microservices ❯❯❯ gunicorn gunicorn files:api -b 0.0.0.0:8003
(1:03:06) ~/billboard-cinema/microservices ❯❯❯ cd ../
```
That's it, we are done on microservices

8. Bootstraping the client
```console
	(1:00:01) ~/billboard-cinema ❯❯❯  cd mashup && npm install && npm start (It will give us a server on htp://localhost:1234)
```
9. Do the register (the link is on the top panel)
10. Enter and go to admin panel:
> http://localhost:1234/admin-panel
11. We are done






