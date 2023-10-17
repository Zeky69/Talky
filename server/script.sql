DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS utilisateur;



CREATE TABLE utilisateur (
                             id SERIAL PRIMARY KEY,
                             nom VARCHAR(255) NOT NULL,
                             prenom VARCHAR(255),
                             email VARCHAR(255) UNIQUE NOT NULL,
                             mot_de_passe VARCHAR(255) NOT NULL,
                             date_inscription TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
                          id SERIAL PRIMARY KEY,
                          emetteur INT NOT NULL,
                          recepteur INT NOT NULL,
                          contenu TEXT NOT NULL,
                          date TIMESTAMP DEFAULT NOW(),
                          FOREIGN KEY (emetteur) REFERENCES utilisateur(id),
                          FOREIGN KEY (recepteur) REFERENCES utilisateur(id)
);

CREATE TABLE amis (
                      id SERIAL PRIMARY KEY,
                      utilisateur1 INT NOT NULL,
                      utilisateur2 INT NOT NULL,
                      date TIMESTAMP DEFAULT NOW(),
                      FOREIGN KEY (utilisateur1) REFERENCES utilisateur(id),
                      FOREIGN KEY (utilisateur2) REFERENCES utilisateur(id)
);



INSERT INTO utilisateur (nom, prenom, email, mot_de_passe) VALUES ('Doe', 'John', 'john@gmail.com', '1234'),
                                                                  ('flop', 'Jane', 'jane@gmail.com', '1234'),
                                                                  ('Quoi', 'Feur', 'quoi@gmail.com', '1234'),
                                                                  ('Toto', 'Titi', 'toto@gmail.com ', '1234');

INSERT INTO messages (emetteur, recepteur, contenu) VALUES (1, 2, 'Salut Jane'),
                                                           (2, 1, 'Salut John'),
                                                           (1, 3, 'Salut Feur'),
                                                           (3, 1, 'Salut John'),
                                                           (1, 4, 'Salut Titi'),
                                                           (4, 1, 'Salut John'),
                                                           (2, 3, 'Salut Feur'),
                                                           (3, 2, 'Salut Jane'),
                                                           (2, 4, 'Salut Titi'),
                                                           (4, 2, 'Salut Jane'),
                                                           (3, 4, 'Salut Titi'),
                                                           (4, 3, 'Salut Feur');

INSERT INTO amis (utilisateur1, utilisateur2) VALUES (1, 2),
                                                     (1, 3),
                                                     (1, 4),
                                                     (2, 3),
                                                     (2, 4),
                                                     (3, 4);

SELECT * FROM utilisateur;
SELECT * FROM messages;

