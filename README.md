# nodeJs-mysql
nodeJs+mysql完成后端接口

记录nodejs 连接数据库的 时候，由于nodejs 和mysql8 以上的 密码解析方式不同报错1251无法访问数据库

解决方法：
进入maysql
    格式： mysql -h主机地址 -u用户名 －p用户密码 
    连接到本机上的MYSQL 一般可以直接键入命令
    mysql -uroot -p1
    //重新修改用户root的密码，并指定mysql模块能够支持的加密方式：
    ALTER USER 'root'@'localhost' IDENTIFIED WITH  mysql_native_password BY 'yourpassword';

