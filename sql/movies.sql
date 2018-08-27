--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id uuid NOT NULL,
    poster character varying NOT NULL,
    synopsis character varying NOT NULL,
    slug character varying NOT NULL,
    title character varying NOT NULL,
    release_date timestamp with time zone NOT NULL
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id uuid NOT NULL,
    slug character varying NOT NULL,
    movie_id uuid NOT NULL,
    body json NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, poster, synopsis, slug, title, release_date) FROM stdin;
40f5096f-5dde-4378-aa20-ee205ae1f1d8	http://localhost:8003/5e27ffad-73d1-4ef1-9e7f-5940ce83b5c2/04160_stonehengestorm_2560x1600.jpg	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat, risus eget fringilla posuere, elit lectus bibendum elit, et commodo dolor nunc bibendum urna. Duis rhoncus odio vel ligula faucibus blandit. Nam sodales lacinia lacus, quis ullamcorper diam tempor vitae. Cras fermentum varius egestas. Donec elementum elit quis risus cursus, ut commodo mi elementum. Praesent vitae eros sit amet erat laoreet ullamcorper. In nec magna nec felis aliquet pellentesque.\n\n	el-programado-en-la-terminal	El programado en la terminal	2018-08-10 09:51:27-05
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, slug, movie_id, body) FROM stdin;
e70e38b2-c575-44ea-9c31-6b572b6aa805	el-programado-en-la-terminal	40f5096f-5dde-4378-aa20-ee205ae1f1d8	{"object": "value", "document": {"object": "document", "data": {}, "nodes": [{"object": "block", "type": "title", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "Esta es una rese\\u00f1a de prueba", "marks": []}]}]}, {"object": "block", "type": "body", "data": {}, "nodes": [{"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat, risus eget fringilla posuere, elit lectus bibendum elit, et commodo dolor nunc bibendum urna. Duis rhoncus odio vel ligula faucibus blandit. Nam sodales lacinia lacus, quis ullamcorper diam tempor vitae. Cras fermentum varius egestas. Donec elementum elit quis risus cursus, ut commodo mi elementum. Praesent vitae eros sit amet erat laoreet ullamcorper. In nec magna nec felis aliquet pellentesque.", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "Suspendisse malesuada luctus tellus, tempor sollicitudin turpis consequat eget. Proin sagittis facilisis efficitur. Sed in tincidunt libero, ac faucibus tellus. Donec at lacus iaculis, accumsan mauris sit amet, malesuada magna. Ut euismod nunc vitae luctus rutrum. Vivamus facilisis leo eget quam laoreet sodales. Donec malesuada, enim eu consectetur consequat, nisi enim vestibulum leo, ac vulputate mauris augue vitae orci. In hac habitasse platea dictumst. Cras leo enim, pellentesque vitae fermentum quis, sollicitudin sed metus. In mattis faucibus bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras tempor ullamcorper leo eu fringilla. Sed ultricies tristique eros, a gravida est malesuada at. Nullam at tortor lorem. Integer neque est, sodales id euismod eget, egestas ut risus. Aenean id laoreet purus.", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "Aenean ut leo mauris. Pellentesque laoreet elementum laoreet. Curabitur ex orci, efficitur a accumsan ac, luctus ac erat. Curabitur imperdiet dui at ante gravida mattis quis vitae justo. Suspendisse nec porta ipsum, id facilisis massa. Vestibulum in tincidunt ipsum, id viverra urna. Curabitur dapibus urna a porttitor ultricies. Praesent id ornare orci. Mauris nulla massa, lobortis id mattis ac, aliquet vel velit. Sed dignissim ipsum sapien, sed venenatis justo placerat eget. Suspendisse ac eros ultrices, iaculis justo eget, pretium turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "Vestibulum sed fringilla mauris. Praesent ut lacus libero. Donec sit amet facilisis mi. Vivamus eu purus quam. Vivamus mattis sollicitudin risus, dapibus euismod orci tempus et. Maecenas maximus interdum felis, a viverra neque placerat eget. Cras nunc orci, iaculis at metus facilisis, venenatis pellentesque libero. Proin vitae efficitur diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida est mattis blandit euismod. Integer aliquet tristique metus, eu placerat est molestie vitae. Fusce sed consequat eros. Curabitur nec faucibus urna.", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "Morbi faucibus mollis eros, ac viverra justo. Cras faucibus erat eget velit imperdiet, sed accumsan magna ornare. Ut luctus cursus est, sit amet porttitor dui vulputate in. Donec condimentum mauris est, et placerat diam suscipit sed. Nam placerat luctus purus, at commodo quam. Curabitur venenatis efficitur ultricies. Vestibulum quis sem quam. Sed blandit leo sollicitudin sapien porta malesuada. Suspendisse mollis aliquam sollicitudin. Nullam elit lacus, porttitor a rhoncus sit amet, ullamcorper id augue. Phasellus sed risus vehicula nisl facilisis elementum in volutpat nisl. Aenean pellentesque a lacus eu venenatis. Vestibulum sodales vestibulum pulvinar. Mauris dapibus in felis a accumsan.", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "", "marks": []}]}]}, {"object": "block", "type": "paragraph", "data": {}, "nodes": [{"object": "text", "leaves": [{"object": "leaf", "text": "", "marks": []}]}]}]}]}}
\.


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies movies_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_slug_key UNIQUE (slug);


--
-- Name: movies movies_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_title_key UNIQUE (title);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_slug_key UNIQUE (slug);


--
-- Name: reviews reviews_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id);


--
-- PostgreSQL database dump complete
--

