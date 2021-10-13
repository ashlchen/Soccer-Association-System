CREATE TABLE Referee (
	RefereeID int NOT NULL,
	RefereeFirst varchar(255) NOT NULL,
	RefereeLast varchar(255) NOT NULL,
	Age int NOT NULL,
	RefereeGrade varchar(255) NOT NULL,
	RefereeSkill int NOT NULL,
	PRIMARY KEY (RefereeID)
);

CREATE TABLE GameAssignment (
	GameID int NOT NULL,
	RefereeID int NOT NULL,
	PositionStatus varchar(255) NOT NULL,
	PRIMARY KEY(GameID, RefereeID)
);

CREATE TABLE Game (
	GameID int NOT NULL,
	Field varchar(255) NOT NULL,
	GameDate datetime NOT NULL,
	PRIMARY KEY(GameID)
);

INSERT INTO Referee (RefereeID, RefereeFirst, RefereeLast, Age, RefereeGrade, RefereeSkill)
VALUES (1, 'Sam', 'Ristow', 23, 3, 56)
VALUES (2, 'Lasya', 'Rameswara', 27, 5, 73)
VALUES (3, 'Ashley', 'Chen', 32, 3, 48)
VALUES (4, 'Ryan', 'Kaufman', 48, 5, 61)

INSERT INTO GameAssignment (GameID, RefereeID, PositionStatus)
VALUES (1,4, 'Tentative')
VALUES (2,2, 'Unassigned')
VALUES (3,2, 'Accepted')
VALUES (4,2, 'Assigned')

INSERT INTO Game (GameID, Field, GameDate)
VALUES (1,'First Baptist', '2021-10-11')
VALUES (2,'Indy Sports Park', '2021-10-30')
VALUES (3,'Yeagley Field', '2021-11-23')
