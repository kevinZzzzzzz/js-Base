修改 MySQL 密码
1、首先要先登录 MySQL：

```
  mysql -uroot -p
```

2、修改密码格式为：

```
  set password for root@localhost = password('123');
      改mysql密码时遇见ERROR 1064 (42000) You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ‘password(‘123456’)’ at line 1报错
  ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'
```
