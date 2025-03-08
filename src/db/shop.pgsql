drop table if exists cart_product;
drop table if exists cart;
drop table if exists account;
drop table if exists product;

create table product (
    id serial primary key, 
    title text not null,
    description text not null,
    price decimal not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);

create table account (
    id serial primary key,
    name text not null,
    lastname text not null,
    email text not null,
    password text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);

create table cart (
    id serial primary key,
    user_id int not null references account(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz
);

create table cart_product (
    id serial primary key,
    cart_id int not null references cart(id),
    product_id int not null references product(id),
    quantity int not null
);


insert into product(title, description, price) values('product 1', 'description 1' , 10.0);
insert into product(title, description, price) values('product 2', 'description 2' , 20.0);
insert into product(title, description, price) values('product 3', 'description 3' , 30.0);

insert into account(name, lastname, email, password) values('user 1', 'lastname 1', 'as.sed@gmail.com', '123');
insert into account(name, lastname, email, password) values('user 2', 'lastname 2', 'as.sed2@gmail.com', '123');

insert into cart(user_id) values(1);
insert into cart(user_id) values(2);

insert into cart_product(cart_id, product_id, quantity) values(1, 1, 2);
insert into cart_product(cart_id, product_id, quantity) values(1, 2, 1);
insert into cart_product(cart_id, product_id, quantity) values(2, 1, 1);
insert into cart_product(cart_id, product_id, quantity) values(2, 2, 1);
