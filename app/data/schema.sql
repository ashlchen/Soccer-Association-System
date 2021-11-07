use larsproject;

DROP TABLE IF EXISTS Referee;
CREATE TABLE Referee (
	RefereeID int NOT NULL AUTO_INCREMENT,
	RefereeFirst varchar(255) NOT NULL,
	RefereeLast varchar(255) NOT NULL,
	Age int NOT NULL,
	RefereeGrade varchar(255) NOT NULL,
	RefereeSkill int NOT NULL,
	PRIMARY KEY (RefereeID)
);

DROP TABLE IF EXISTS Game;
CREATE TABLE Game (
	GameID int NOT NULL AUTO_INCREMENT,
	Field varchar(255) NOT NULL,
	GameDate datetime NOT NULL,
	PRIMARY KEY(GameID)
);

DROP TABLE IF EXISTS GameAssignment;
CREATE TABLE GameAssignment (
	AssignmentID int NOT NULL AUTO_INCREMENT,
	GameID int NOT NULL, 
    FOREIGN KEY(GameID) REFERENCES Game(GameID) ON UPDATE CASCADE ON DELETE CASCADE,
	RefereeID int, 
    FOREIGN KEY(RefereeID) REFERENCES Referee(RefereeID) ON UPDATE CASCADE ON DELETE CASCADE,
	PositionName varchar(255) NOT NULL,
	PositionStatus varchar(255) NOT NULL DEFAULE 'Unassigned',
	PRIMARY KEY(AssignmentID)
);



INSERT INTO Referee (RefereeFirst, RefereeLast, Age, RefereeGrade, RefereeSkill)
VALUES
('Sam', 'Ristow', 23, 3, 56),
('Lasya', 'Rameswara', 27, 5, 73),
('Ashley', 'Chen', 32, 3, 48),
('Ryan', 'Kaufman', 48, 5, 61);

INSERT INTO Game (Field, GameDate)
VALUES 
('First Baptist', '2021-10-11'),
('Indy Sports Park', '2021-10-30'),
('Yeagley Field', '2021-11-23');

INSERT INTO GameAssignment (GameID, RefereeID, PositionName, PositionStatus)
VALUES 
(1,4, 'Head','Pending'),
(2,3, 'Assist1', 'Pending'),
(3,2, 'Assist2', 'Pending' ),
(4,1, 'Assist3', 'Pending');

