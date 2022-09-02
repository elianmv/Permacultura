
#addPaises

insert into pais (name)
values ("Argentina"),("Peru"),("Chile"),("Uruguay"), ("Paraguay");



#addCuidades

insert into ciudad (zip_code,name,pais_name)
values(7000,"Tandil","Argentina"),
		(7001,"Balcarce","Peru"),
        (7002,"Loberia","Chile"),
        (7003,"Tres Arroyos","Argentina"),
        (7004,"Bahia Blanca","Argentina"),
        (7005,"Pehuajo","Chile"),
        (7006,"Junin","Peru"),
        (7007,"Chacabuco","Uruguay");


#addTipo_Cliente

insert into  tipo_usuario (name)
values ('admin'),
('prov'),
('cli');


insert into direccion(street, number, ciudad_zip_code )
values ('Dunning',2420,7005),
('Debra',8119,7005),
('Towne',8,7005),
('Bay',161,7006),
('Nobel',82613,7002),
('Rusk',692,7005),
('Marquette',5661,7006),
('Harper',01764,7005),
('Hayes',6882,7005),
('Butternut',52692,7001),
('Twin',02990,7001),
('Porter',87507,7005),
('West',792,7007),
('Carioca',10450,7005),
('Grasskamp',59334,7006),
('Sullivan',67035,7003),
('Straubel',67,7000),
('Huxley',4,7004),
('Monica',11230,7003),
('Calypso',1081,7007),
('Becker',7,7002),
('Mayfield',14750,7004),
('Meadow Vale',73536,7004),
('Red' ,04563,7002),
('Lighthouse' ,224,7000),
('Bartillon',8,7001),
('Cody',0911,7004),
('Dapin',0637,7005),
('Dorton',494,7006),
('Express',54,7006),
('Towne',5,7005),
('Pennsylvania',22296,7000),
('Mallard',7,7000),
('Village',4889,7002),
('Morrow',13752,7000),
('Ryan',7,7000),
('Maple',0248,7005),
('Cordelia',630,7000),
('Sommers',22841,7002),
('Florence',6,7006),
('Merrick',10,7004),
('Butterfield',98,7000);



##addUsuarios

insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (41721451, 'lpunyer0', 'Vincenz', 'Punyer', 'jZ2ezve', 'lpunyer0@shareasale.com', '9152051683', 'cli', 27);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (27996693, 'ldensey1', 'Phillida', 'Densey', '1p8U9muTn', 'ldensey1@homestead.com', '1168723715', 'cli', 7);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (24919453, 'pcambell2', 'Brockie', 'Cambell', 'C7V8KptKi', 'pcambell2@liveinternet.ru', '6409921186', 'cli', 27);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (38487024, 'blarn3', 'Amabel', 'Larn', 'JKUjC5EN4Xl', 'blarn3@wikia.com', '1363234558', 'cli', 27);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (39731927, 'pmatskevich4', 'Lorant', 'Matskevich', 'uJuZvLcKLYs', 'pmatskevich4@comcast.net', '1887486793', 'cli', 30);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (21979880, 'tbridgeland5', 'Wyndham', 'Bridgeland', 'ZZHj30Hmt', 'tbridgeland5@netscape.com', '2583525444', 'cli', 3);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (23646981, 'kkupisz6', 'Rosco', 'Kupisz', 'nIpKNe3', 'kkupisz6@google.it', '2976182032', 'cli', 11);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (34693483, 'nbeams7', 'Matias', 'Beams', 'ynpJHUa', 'nbeams7@google.co.uk', '6552838755', 'cli', 23);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (47994011, 'dpastor8', 'Agustin', 'Pastor', 'ujIjgrbv', 'dpastor8@ebay.co.uk', '3754631990', 'cli', 20);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (43984084, 'cstiell9', 'Theda', 'Stiell', 'DpkjQD', 'cstiell9@github.io', '8443423023', 'cli', 40);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (38322472, 'ewalsha', 'Burtie', 'Walsh', 'vNlo3FTVSQ', 'ewalsha@lulu.com', '6195118524', 'cli', 10);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (24141127, 'fblibenb', 'Herta', 'Bliben', 'OErwxIh6A', 'fblibenb@guardian.co.uk', '5536389069', 'cli', 9);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (35092647, 'gpetcherc', 'Lisetta', 'Petcher', 'Rr6FvbM7', 'gpetcherc@eepurl.com', '8655301404', 'cli', 15);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (25665442, 'dkiernand', 'Hali', 'Kiernan', 'h9gZSWC2iCP', 'dkiernand@nps.gov', '4133539868', 'cli', 28);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (31467217, 'gquincee', 'Reagen', 'Quince', 'QWswks', 'gquincee@yahoo.co.jp', '1081903295', 'cli', 34);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (22591089, 'ddionisof', 'Meghan', 'Dioniso', 'rVQel3WZ7N5V', 'ddionisof@purevolume.com', '7798151234', 'admin', 3);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (47682636, 'nprestidgeg', 'Darcey', 'Prestidge', '4Ph44RBRV', 'nprestidgeg@simplemachines.org', '7795631159', 'prov', 28);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (27480720, 'fcadanyh', 'Cookie', 'Cadany', 'iSMoLAvasD', 'fcadanyh@reverbnation.com', '3997923043', 'prov', 40);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (24486066, 'mgarrityi', 'Nil', 'Garrity', 'wP1o3L6RrL', 'mgarrityi@google.nl', '2585300369', 'prov', 1);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (31231847, 'bedlerj', 'Fanny', 'Edler', 'J6MQEtxoV', 'bedlerj@studiopress.com', '3404237290', 'prov', 32);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (40732653, 'dstoodalek', 'Kristine', 'Stoodale', 'WmoBF9mnZi', 'dstoodalek@sakura.ne.jp', '7163396575', 'prov', 13);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (28466912, 'gcavendishl', 'Henri', 'Cavendish', '00gP6OmUJe', 'gcavendishl@ed.gov', '9904843277', 'prov', 21);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (34996636, 'foldfieldcherrym', 'Dredi', 'Oldfield-Cherry', 'rI10NbgUoY6', 'foldfieldcherrym@cisco.com', '1876968404', 'prov', 28);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (43932418, 'fpocklingtonn', 'Nessy', 'Pocklington', 'Pu4VJ0DHc', 'fpocklingtonn@surveymonkey.com', '4066760128', 'prov', 14);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (36356117, 'spettieo', 'Prentiss', 'Pettie', 'V1PPD3Z1ns', 'spettieo@home.pl', '1704155264', 'prov', 16);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (46687635, 'bwhelpdalep', 'Hedvige', 'Whelpdale', 'BtYfct0Z', 'bwhelpdalep@ustream.tv', '3056424084', 'prov', 18);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (26486106, 'hflandersq', 'Rockie', 'Flanders', 'DnGQ8NpPqbL', 'hflandersq@fotki.com', '6889261957', 'prov', 17);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (21957548, 'losbanr', 'Frederigo', 'Osban', 'wGaxwSG4', 'losbanr@google.com.br', '5202489903', 'prov', 22);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (28284682, 'lmoultries', 'Korella', 'Moultrie', 'm2riHiDZAH', 'lmoultries@dion.ne.jp', '2307952830', 'prov', 19);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (47070396, 'jrufft', 'Johann', 'Ruff', '4in0efmb', 'jrufft@independent.co.uk', '5045529077', 'prov', 27);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (38213123, 'pleiboldu', 'Nara', 'Leibold', 'esYzcnA', 'pleiboldu@nps.gov', '1483653678', 'prov', 22);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (20478045, 'cmeconiv', 'Sallee', 'Meconi', 'FxBKEu', 'cmeconiv@smh.com.au', '7951583927', 'prov', 20);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (22297689, 'kharbyw', 'Tressa', 'Harby', '7tChbuGsBS', 'kharbyw@bbc.co.uk', '8883890480', 'prov', 11);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (21662774, 'rhenfrex', 'Stearne', 'Henfre', 'vHc818zwOJ', 'rhenfrex@mashable.com', '2804296987', 'cli', 26);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (29573862, 'sbifieldy', 'Wayne', 'Bifield', 'OOAeLLHiOAa', 'sbifieldy@hao123.com', '4931222767', 'cli', 9);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (27628380, 'bcoltanz', 'Grace', 'Coltan', 'U4bkLLvafcq', 'bcoltanz@umn.edu', '7329533634', 'cli', 10);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (45816210, 'dnaisbitt10', 'Chrissy', 'Naisbitt', 'JblhkVGaJa', 'dnaisbitt10@symantec.com', '1632876581', 'cli', 15);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (38916980, 'dwaywell11', 'Bertie', 'Waywell', 'dqIaUu3q0hnZ', 'dwaywell11@google.com', '6397869036', 'cli', 25);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (40984293, 'kbulpitt12', 'Rafferty', 'Bulpitt', 'YPCMePW', 'kbulpitt12@artisteer.com', '1777644823', 'cli', 29);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (49734530, 'lhuckster13', 'Muhammad', 'Huckster', '9pgbuEno', 'lhuckster13@skyrock.com', '3517830241', 'cli', 41);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (40506671, 'ggarza14', 'Chas', 'Garza', 'UfklDxyMpH', 'ggarza14@drupal.org', '5114118171', 'admin', 4);
insert into usuario (dni, username, name, lastname, password, email, phone, tipo_usuario_name, direccion_id) values (43199282, 'alinning15', 'Angele', 'Linning', 'MNC6N5', 'alinning15@prlog.org', '3963140531', 'admin', 26);







insert into categoria (name) values ('Construccion');
insert into categoria (name) values ('Instalacion');
insert into categoria (name) values ('Reparacion');
insert into categoria (name) values ('Bioconstruccion');
insert into categoria (name) values ('Mantenimiento');


insert into servicio (name, categoria_id) values ('Colocación de paneles solares', '2');
insert into servicio (name, categoria_id) values ('Construcción casa de maderas', '4');
insert into servicio (name, categoria_id) values ('Instalación horno de barro', '2');
insert into servicio (name, categoria_id) values ('Construcción horno de barro', '1');
insert into servicio (name, categoria_id) values ('Reparación paneles solares', '3');
insert into servicio (name, categoria_id) values ('Colocación de termo solar', '2');
insert into servicio (name, categoria_id) values ('Construcción casa de bambú', '4');
insert into servicio (name, categoria_id) values ('Reparación de casa bambú', '3');
insert into servicio (name, categoria_id) values ('Reparación de termo solar', '3');
insert into servicio (name, categoria_id) values ('Mantenimiento de huerta', '5');