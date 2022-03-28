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

CREATE TABLE `kiriki`.`games` (
      `game_id` INT NOT NULL AUTO_INCREMENT ,
      `host_id` INT NOT NULL , 
      `winner_id` INT NULL ,
      `name` VARCHAR NOT NULL 255, 
      `password` VARCHAR NOT NULL 255,
      `date` DATE NOT NULL , 
      PRIMARY KEY (`game_id`),
      FOREIGN KEY(`host_id`) REFERENCES `kiriki`.`players`(`player_id`),
      FOREIGN KEY(`winner_id`) REFERENCES `kiriki`.`players`(`player_id`)
);