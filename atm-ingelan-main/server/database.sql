create table atm_validation (
   	atm_id int not null primary key,
	day text not null,
    auditorname text not null,
	ATMaddress text not null,
	city text not  null,
	ClientName text not null,
	Region text not null);



create table atm_site (
    atm_id int not null,
    day text not null,
    auditorname text not null,
    ATMaccesscontrol boolean not null,
    OperationalAccessControl boolean not null,
    ElectricalConnections boolean not null,
    GeneralstatusATMspace boolean not null,
    floorState boolean not null,
    Statewalls boolean not null,
    Doorstatus boolean not null,
    Stateheavens boolean not null,
    Airconditioningstatus boolean not null,
	lightingstatus boolean not null,
	Furniturecondition boolean not null,
	Statemonitoringcameras boolean not null
);

alter table atm_site
ADD FOREIGN KEY(atm_id)
REFERENCES atm_validation(atm_id);

create table physical_atm (
    atm_id int not null,
    day text not null,
    auditorname text not null,
    ATMscreenstatus boolean not null,
    ATMKeyboardstatus boolean not null,
    DamagedATMkeypads boolean not null,
    keyboardcovers boolean not null,
    legiblereceipt boolean not null,
    ATMtrash boolean not null,
    ATMpresentation boolean not null
);

alter table physical_atm
ADD FOREIGN KEY(atm_id)
REFERENCES atm_validation(atm_id);

create table atm_signage (
    atm_id int not null,
    day text not null,
    auditorname text not null,
    Visa_Sticker boolean not null,
    Visa_Adhesive_design boolean not null,
    Visa_sticker_meets_location boolean not null,
    Mastercard_sticker boolean not null,
	Mastercard_Adhesive_design boolean not null,
    Mastercard_sticker_meets_location boolean not null,
    Visible_ATM_Number boolean not null,
    Atm_Safety_Signage boolean not null,
    Atm_Safety_Measures_Signage_StopDisc boolean not null,
	Redbanc_tape boolean not null,
	Redbanc_tape_location boolean not null,
	redbanc_tape_meets_length boolean not null,
	redbanc_ribbon_meets_design boolean not null,
	Graphic_on_the_side_of_Atm boolean not null,
	floor_chart boolean not null
);

alter table atm_signage
ADD FOREIGN KEY(atm_id)
REFERENCES atm_validation(atm_id);

create table exterior_signage (
    atm_id int not null,
    day text not null,
    auditorname text not null,
    Redbanc_Outdoor_Signage boolean not null,
    Exterior_wall_signage boolean not null,
    Exterior_signage_selfadhesive_logo boolean not null,
    Exterior_signage_selfadhesive_logo_ok boolean not null
);

alter table exterior_signage
ADD FOREIGN KEY(atm_id)
REFERENCES atm_validation(atm_id);


