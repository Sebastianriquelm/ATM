# Instrucciones para arrancar

## Clonar y configurar:
Necesario tener git en el sistema

```sh
git clone git@github.com:Emonee/atm-ingelan.git
```

### En server/ crear archivo .evn y proporcionar con el siguiente formato para conectar on base de datos PostgreSQL:

```
POSTGRES_USER=user
POSTGRES_PASSWORD=password123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=db_name
PORT=3000
```

## Para instalar y arrancar:
Necesario tener versiones mantenidas de node y npm

```sh
cd atm-ingelan/client
npm install
npm run build
cd ../server
npm install
node index.js
```

# Tablas

## atm:



## check_list:

| Dato | Tipo | Especificaciones |
| ----- | ---- | -----|
| atm_id                          | integer | not null, foreign key references atm(atm_id) | 
| day                             | text    | not null | 
| place                           | text    | not null | 
| electric_connection             | boolean | not null | 
| anti_vandal_pipe                | boolean | not null | 
| paint_state                     | boolean | not null | 
| trash                           | boolean | not null | 
| floor_state                     | boolean | not null | 
| keys_delivered                  | boolean | not null | 
| communication_furniture_signage | boolean | not null | 
| side_signals                    | boolean | not null | 
| redbanc_signals                 | boolean | not null | 
| comments                        | text    | not null | 
| technicians_name                | text    | not null |

## service_description:

| Dato | Tipo | Especificaciones |
| ----- | ---- | -----|
| atm_id                     | integer | not null, foreign key references atm(atm_id) | 
| day                        | text    | not null | 
| place                      | text    | not null | 
| operational_upon_arrival   | boolean | not null | 
| temperature_in_celsius     | text    | not null | 
| sonda_or_redbanc_attention | text    | not null | 
| attention_names            | text    | not null | 
| attention_comments         | text    | not null | 
| network_wire_state         | boolean | not null | 
| local_voltage_fn           | text    | not null | 
| local_voltage_ft           | text    | not null | 
| local_voltage_nt           | text    | not null | 
| conditioner_fn             | text    | not null | 
| conditioner_ft             | text    | not null | 
| conditioner_nt             | text    | not null | 
| other_voltages_fn          | text    | not null | 
| other_voltages_ft          | text    | not null | 
| other_voltages_nt          | text    | not null | 
| comments                   | text    | not null | 
| technicians_name           | text    | not null | 
