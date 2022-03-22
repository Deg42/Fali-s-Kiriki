CREATE TABLE `kiriki`.`players` (
     `player_id` INT NOT NULL AUTO_INCREMENT ,
     `username` VARCHAR NOT NULL ,
      `email` VARCHAR NOT NULL ,
      `password` VARCHAR NOT NULL ,
      `reg_date` DATE NOT NULL ,
      `games_won` INT NOT NULL ,
      PRIMARY KEY (`player_id`),
      UNIQUE (`username`),
      UNIQUE (`email`)
);