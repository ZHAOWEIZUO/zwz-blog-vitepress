<!--
 * @Author: zwz
 * @Date: 2023-11-13 15:39:38
 * @LastEditors: zwz
 * @LastEditTime: 2023-11-13 15:39:38
 * @Description: 请填写简介
-->
## 1、连接数据库

###  命令行连接


````sql
1.mysql -uroot -proot -- 连接数据库
2.

-- 所有的语句都要用分号结尾 ;
show databases; -- 查看所有数据库
use zwz; -- 切换数据库 use 数据库名
show tables; -- 查看数据库中所有的表
describe user_info; -- 显示数据库中表所有的信息
create database westos; -- 创建一个数据库

-- 单行注释
/*
多行注释
*/
````

## 2、操作数据库

### 2.1、操作数据库

1.创建数据库

```sql
create database [IF NOT EXISTS] WESTOS; -- if no exists 可选的意思 非必要
```

2.删除数据库

```sql
DROP DATABASE IF EXISTS westo; -- 删除
```

3.使用数据库

```sql
USE westo; -- 使用
```

4.查看所有的数据库

```sql
SHOW DATABASES -- 查看所有的数据库
```

### 2.2、数据库的列类型

```sql
数值
```

tinyint  十分小的数据   1个字节

smallint  较小的数据     2个字节

**int    标准的整数  4个字节**       常用的

bigint    较大的整数   8个字节  

float   浮点数     4个字节

double   浮点数   8个字节  （精度问题）

decimal   字符串形式的浮点数   金融计算一般使用 decimal

```js
字符串
```

char      字符串固定大小   0-255

**varchar   可变字符串   0-65535**     常用  string

tinytext    微型文本   2^8  -1  

**text    文本串     2^16 - 1**    保存大文本

```sql
时间日期
```

date     YYYY-MM-DD 日期

time     HH:mm:ss   时间格式

**datetime  YYYY-MM-DD HH:mm:ss  最常用的时间格式** 

**timestamp    时间戳，      1970.1.1 到现在的毫秒数！较为常用**

Yaer  年份表示

```sql
null
```

没有值 ，未知

主意，不要使用NULL进行运算，结果为NULL

### 2.3 、数据库的字段属性（重点）

**Unsigned：**

无符号的整数

声明了该列不能声明为负数

**zerofill：**

0填充的

不足的位数，使用0来填充， int（3），5 --- 005

**自增：**

通常理解为自增，自动在上一条记录的基础上+1 （默认）

通常用来设置唯一的主建~ index ，必须是整数类型

可以自定义设计主键自增的起始值和步长

**非空** Null not null

- 假设设置为 not null ，如果不给它赋值，就会报错！
- NUll，如果不填写值，默认就是null！

默认：

- 设置默认的值！
- sex，默认值为男，如果不指定该列的值，则会有默认的值！

###  2.4、创建数据库表（重要）

```sql
-- AUTO_INCREMENT 自增
-- 字符串使用 单引号括起来
-- 所有的语句后面都要加, （英文）, 最后一个不用加
-- PRIMARY KEY 主键 一般一个表只有一个唯一的主键！
CREATE TABLE `student` (
  `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '12345' COMMENT '密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '生日',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
	`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
	PRIMARY KEY(`id`) 
) ENGINE=INNODB DEFAULT CHARSET=utf8
```

格式

```sql
CREATE TABLE [IF NOT EXISTS] `表名` (
  '字段名' 列类型 [属性] [索引] [注释],
  .....
) [表类型][字符集设置][注释]
```

### 2.5、数据库的类型

```sql
-- 关于数据库引擎
/*
INNODB 默认使用~
MYISAM 早些年使用的
*/
```

|              | MYSIAM | INNODB        |
| :----------- | ------ | ------------- |
| 事务支持     | 不支持 | 支持          |
| 数据行锁定   | 不支持 | 支持          |
| 外键约束     | 不支持 | 支持          |
| 全文索引     | 支持   | 不支持        |
| 表空间的大小 | 较小   | 较小，约为2倍 |

常规使用操作：

- MYISAM 节约空间 速度较快 
- INNODB 安全性高 支持事务处理，多表多用户操作

>在物理空间存在的位置

所有的数据库文件都在存在data目录下 本质还是文件的存储

MYSQL 引擎在物理文件上的区别

- InnoDB 在数据库表中只有一个 *.frm 文件，以及上级目录下的 ibdata1 文件

- MYISAM 对应的文件

   *.frm - 表结构的定义文件

  *.MYD 数据文件（data）

  *.MYI  索引文件（index）

> 设置数据库的字符集编码

```sql
CHARSET=utf8
```

不设置的话，会是mysql默认的字符集编码~ （不支持中文！）

MysQL的默认编码是Latin1，不支持中文

在my.ini 中配置默认的编码

```ini
charset-set-server=utf8
```



### 2.6、修改删除表

> 修改

```sql
-- 修改表名: ALTER TABLE 旧表名 RENAME AS 新表名
ALTER TABLE student RENAME AS student1
-- 增加表的字段： ALTER TABLE 表名 ADD 字段名 列属性
ALTER TABLE student1 ADD age INT(11)

--  修改表的字段（重点名，修改约束！）
-- ALTER TABLE 表名 MODIFY 字段名 属性列[]
ALTER TABLE student1 MODIFY age VARCHAR(11) -- 修改约束
-- ALTER TABLE 表名 CHANGE 旧名字 新名字 列属性[]
ALTER TABLE student1 CHANGE age age1 INT(1) --  字段重命民

-- 删除表的字段： ALTER TABLE 表名 DROP 字段名
ALTER TABLE student1 DROP age1 
```

> 删除

```sql
-- 删除表（如果表存再删除）
DROP TABLE IF EXISTS teacher1
```

```ini
所有的创建和删除操作尽量加上判断 以免报错
```



注意点

- `` 字段名，使用这个包裹
- 注释 -- /**/
- sql 关键字大小写  不敏感，建议大家小写
- 所有的符号全都用英文！

## 3、Mysql数据管理

### 3.1、外键（了解即可）

> 方式一、再创建表的时候，增加约束（麻烦，比较负载）

```sql
CREATE TABLE `grade` (
  `gradeid` INT(10) NOT NULL AUTO_INCREMENT COMMENT '年底id',
	`gradename` VARCHAR(50) NOT NULL COMMENT '年纪名称',
	PRIMARY KEY(`gradeid`)
)ENGINE=INNODB DEFAULT CHARSET=utf8
-- 学生表的 gradeid 字段 要去引用年级表的gradeid
-- 定义外键 key
-- 给这个外键添加约束（执行引用） references 引用
CREATE TABLE `student` (
  `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '12345' COMMENT '密码',
	·sex· VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '生日',
	`gradeid` INT(10) NOT NULL COMMENT '学生的年级',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
	`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
	PRIMARY KEY(`id`),
	KEY `FK_gradeid` (`gradeid`),
	CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade`(`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8
```

删除有外键关系的表的时候，必须先删除引用别人的表（从表），再删除被引用的表（主表）

> 方式二：创建表成功后，添加外键约束

```sql
CREATE TABLE `student` (
  `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '12345' COMMENT '密码',
	·sex· VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '生日',
	`gradeid` INT(10) NOT NULL COMMENT '学生的年级',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
	`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
	PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

-- 创建表的是没有外键关系
ALTER TABLE `student`
ADD CONSTRAINT `FK_gradeid` FOREIGN KEY(`gradeid`) REFERENCES `grade`(`gradeid`)
-- ALTER TABLE 表 ADD CONSTRAINT 约束名 FOREIGN KEY(作为外键的列) REFERENCES 那个表（哪个字段）
```

以上的操作都是物理外键，数据库级别的外键，我们不推荐使用

最佳实践

- 数据库就是单纯的表，只用来存数据，只有行和列，
- 我们想使用多张表的数据，想使用外键（程序去实现）

### 3.2、DML语言（全部记住）

**数据库意义**：数据存储，数据管理

```sql
-- 插入语句（添加）
-- INSERT INTO 表名（[字段名,字段2,字段3]) values('值1','值2','值3')
INSERT INTO `grade`(`gradename`) VALUES('大四')

-- 由于主键自增我们可以省略 （如果不写的表的字段，他会一一匹配）
INSERT INTO `grade` VALUES('大三')
INSERT INTO `grade`(`gredeid`,`gradename`) VALUES('大三')
-- 一般写插入语句 数据和字段 一定要一一对应

INSERT INTO `student`(`name`,`pwd`,`sex`,`gradeid`) VALUES ('李四','aaaa','男','1'),('王五','bbbb','女','2')
```

### 3.3、添加Insert语句

语法：insert into 表名([字段名,字段2,字段3])  values('值1','值2','值3')

注意事项:

1. 字段和字段之前使用 英文逗号隔开
2. 字段是可以省略的，但是后面的值必须要 一一对应，不能少
3. 同时插入多条数据，values后面的值，需要使用 逗号隔开即可 values(),()....

### 3.4、修改

> Update  修改谁（条件）set 原来的值 = 新值

```sql
-- 修改学员名字，带了条件
UPDATE `student` SET 	`name` = '狂神' WHERE id = 1

-- 不指定条件的情况下，会改变所有表！
UPDATE `student` SET `name` = '长江7号'

-- 修改多个属性，逗号隔开
UPDATE `student` SET `sex`='女', `address`='重庆' WHERE id = 1;
-- 语法
-- UPDATE 表名 set colunm_name = value where [条件]
```

| 操作符           | 含义                  | 范围        | 结果  |
| ---------------- | --------------------- | ----------- | ----- |
| =                | 等于                  | 5=6         |       |
| <> 或者!=        | 不等于                | 5<>6        | True  |
| >                |                       |             |       |
| <                |                       |             |       |
| >=               |                       |             |       |
| <=               |                       |             |       |
| BETWEEN...AND... | 在某个范围内 闭合区间 | [2,5]       |       |
| AND              | 我和你 &&             | 5>1 and 1>2 | False |
| OR               | 我或你 \|\|           | 5>1 or 1>@  | True  |

```sql
UPDATE `student` SET `email`='zhaoweizuo@163.com' WHERE id = 1 AND name = '范彩1'
```

语法：UPDATE 表名 set colunm_name = value where [条件]

注意：

1.   colnum_name 是数据库的列，尽量带上``

2. 条件，筛选的条件，如果没有指定就会修改所有的列，

3. value，是一个具体的值，也可以是一个变量

4. 多个设置的属性之间，使用英文逗号隔开

   ```sql
   UPDATE  `student`  SET `birthday`=CURRENT_TIME WHERE id = 1 AND name = '范彩1'
   ```

### 3.5、删除

> Delate 命令

语法 `delete from 表名[where 条件]`

```SQL
-- 删除数据 （避免这样写，会全部删除）
DELETE FROM `student`

-- 删除指定数据
DELETE FROM `student` WHERE id = 1;
```

> TRUNCATE 命令

作用：完全清空一个数据库表，表接口和索引约束不会变!

```sql
-- 清空 student 表
TRUNCATE `student`
```

> Delete 的 TRUNCATE 区别

- 相同点：都能删除数据，都不会删除表结构

- 不同：

   TRUNCATE 重新设置 自增列 计数器会归零

  TRUNCATE 不会影响事物

## 4、DQL查询数据（重点）

### 4.1、DQL

（Data Query LANGUAGE:  数据查询语言）

- 所有的查询操作都用它 Select
- 简单的查询，复杂的查询它都能做
- 数据库中最核心的语言，最重要的语言
- 使用频率最高的语句

### 4.2、指定查询字段

```sql
-- 查询全部的学生  SELECT 字段 FROM 表
SELECT * FROM student

-- 查询指定字段
SELECT `Student`,`StudentName` FROM student

-- 别名，给结果起一个名字 AS 可以给字段起别名，也可以给表起别名
SELECT `StudentNo` AS 学号,`StudentName` AS 学生姓名 FROM student AS s

-- 函数 Concat（a,b）
SELECT CONCAT('姓名：',StudentName) AS 新名字 FROM student
```

语法：`SELECT 字段,..... FROM 表`

> 有时候，列名字不是那么的见名知意。我们起别名 AS   表名AS别名





> 去重 distinct

作用：去除SELECT查询出的结果中重复的数据，只显示一条

```sql
-- 查询一下有多少同学参加了考试
SELECT * FROM `result` -- 查询全部的考试成绩
SELECT `StudentNo` FROM result  -- 查询有哪些同学参加了考试
SELECT DISTINCT `StudentNo` FROM result  -- 发现重复数据 去重
```



> 数据库的列（表达式）

```sql
SELECT VERSION()  -- 查询系统的版本
SELECT 100*3-1 AS 计算结果\
-- 查询所有的学员考试成绩 + 1分查看
SELECT `StudentNo`, `StudentResult` + 1 AS 提分后 FROM result
```

数据库中的表达式：文本值，列，函数，计算表达式，系统变量。。。。

SELECT 表达式 FROM 表



### 4.3、where 条件子句

作用：检索数据中符合条件的值

> 逻辑运算符

| 运算符 |      |      |
| ------ | ---- | ---- |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |

```sql
SELECT studentno, studentresult FROM result
-- 查询考试成绩再98和100之间
SELECT studentno, studentresult FROM result WHERE studentresult >= 98 AND studentresult <= 100
SELECT studentno, studentresult FROM result WHERE studentresult >= 98 && studentresult <= 100

-- 模糊查询（区间）
SELECT studentno, studentresult FROM result WHERE  BETWEEN 95 AND 100

-- 除了1000学号以为的学号的学生成绩
SELECT studentno, studentresult FROM result WHERE studentno != 1000
-- !=  not
SELECT studentno, studentresult FROM result WHERE not studentno = 1000
```



> 模糊查询： 比较运算符

| 运算符      | 语法               | 描述                                             |
| ----------- | ------------------ | ------------------------------------------------ |
| IS NULL     | a is null          | 如果操作符为NULL 则结果为真，                    |
| IS NOT NULL | a is not null      | 如果操作符为not null，结果为真                   |
| BETWEEN     | a between b and c  | 假如 a在 b和c之间，则结果为真                    |
| **Like**    | a Like b           | sql 匹配，如果a匹配b 则结果为真                  |
| **ln**      | a in(a1,a2,a3....) | 假设a在a1，或者a2.... 其中的某一个值中，结果为真 |
|             |                    |                                                  |
|             |                    |                                                  |
|             |                    |                                                  |
|             |                    |                                                  |

```sql
-- ===== 模糊查询
-- 查询刘姓的同学
-- like结合 %(代表0到任意的字符串) _(一个字符)
SELECT `StudentNo`,`studentname` FROM student WHERE studentname Like '刘%'

-- 查询姓刘的同学，名字后面只有一个字的 
SELECT studentno, studentname FROM student WHERE studentname LIKE '刘_'

-- 查询姓刘的同学，名字后面有两个字
SELECT studentno,studentname FROM student WHERE studentname LIKE '刘__'

-- 查询名字中间有嘉字的同学，%嘉%
SELECT studentno,studentname FROM student WHERE studentname LIKE '%嘉%'

-- ========= in(具体查询的一个或者多个值)
-- 查询1001,1002,1003号的学号
SELECT studentno FROM student WHERE studentno in(1001,1002,1003)

-- 查询在北京的学生
SELECT studentno FROM student WHERE address in('北京')

-- ========null  not null

-- 查询地址为空的学生 null  ''
SELECT studentno,studentname FROM student WHERE address='' OR IS NULL

SELECT studentno FROM student WHERE Borndate IS NOT NULL
```

### 4.4、联表查询

> JOIN 对比

```sql
-- ======= 联表查询
-- 查询参加了考试的同学（学号，姓名，科目编号，分数）
SELECT * FROM student
SELECT * FROM result

/*
思路：
1、需求分析，分析查询的字段来自哪些表，（连接查询）
2、确定使用哪种查询？ 7种查询
确定交叉点（这两个表中哪个数据是相同的）
判断条件：学生表中 studentNo = 成绩表中的 studentNo
*/

SELECT s.studentno, studentname,subjectno,studentresult FROM student AS s
INNER JOIN result AS r WHERE s.studentno = r.studentno

-- right JOIN
SELECT s.studentno, studentname,subjectno,studentresult FROM student AS s 
RIGHT JOIN result AS r ON s.studentno = r.studentno

-- left JOIN
SELECT s.studentno, studentname,subjectno,studentresult FROM student AS s 
LEFT JOIN result AS r ON s.studentno = r.studentno
```

| 操作       | 描述                                       |
| ---------- | ------------------------------------------ |
| inner join | 如果表中有匹配的，就会返回                 |
| left join  | 也会从左表中返回所有的值，即使右表没有匹配 |
| right join | 会从右表中返回所有的值，即使左表中没有匹配 |

```sql
-- 查询缺考的同学
SELECT s.studentno, studentname,subjectno,studentresult FROM student AS s 
LEFT JOIN result AS r ON s.studentno = r.studentno 
WHERE studentresult IS NULL


思路：
1.分析需求，分析查询的字段来自那些表，student，result，subject（连接查询）
2. 确定使用哪种查询？ 7种查询
确定交叉点（这两个表中哪个数据是相同的）
判断条件：学生表中 studentNo = 成绩表中的 studentNo
*/
SELECT s.studentno, studentname, subjectname, studentresult FROM student AS s 
RIGHT JOIN result AS r 
ON r.studentno = s.studentno
INNER JOIN `subject` AS sub
ON r.subjectno = sub.subjectno
-- 我要查询哪些数据 select......
-- 从那几张表中查FROM 表 xxx join 连接的表 on 交叉条件
-- 假设存在一种多张表查询, 慢慢来 ，先查询两张表 然后再慢慢增加查询

```



> 自连接

```sql
-- 查询父子信息： 把一张表看为两张表一模一样的表
SELECT a.categoryName AS '父栏目',b.categoryName AS '子栏目' FROM category AS a, category AS b
WHERE a.categoryid = b.pid
```

### 4.3、分页和排序

```sql
-- 分页每页只显示5条数据
-- 语法：limit  起始页 显示的数据量
SELECT s.studentno AS '学号', studentname AS '学生姓名', subjectname AS '科目名称', studentresult AS '分数' FROM student s 
INNER JOIN result r ON s.studentno = r.studentno
INNER JOIN `subject` sub ON r.subjectno = sub.subjectno
WHERE sub.subjectname = '大学英语'
ORDER BY studentresult ASC
LIMIT 0,5

-- 第一页  limit 0,5  (1-1) * 5
-- 第二页 limit 5,5 (2-1) *5
-- 第N页 limit 10,5 (n-1) * pageSize,pageSize
-- [pageSize: 页面大小, (n-1) * pageSize 起始值, n 当前页]
-- [n, 当前页]
-- [数据总数/页面大小 = 总页数]
```

语法：`limit(查询起始下标，pageSize)`

### 4.6、子查询

where （这个值是计算出来的）

本质: `在where语句中嵌套一个子查询语句`

where(select * from)

## 5、Mysql 函数

### 5.1、常用函数

```sql
-- =================== 常用函数 ======================
SELECT ABS(-8) -- 绝对值
SELECT CEILING(9.4) -- 向上取整数
SELECT FLOOR(9.4) -- 向下取整数
SELECT RAND() -- 返回一个 0-1 之间的随机数
SELECT SIGN(-10) -- 判断一个数的符号  0-0 负数返回 -1 

-- 字符串函数
select CHAR_LENGTH('施总一夜暴富')   -- 字符串长度
SELECT CONCAT('施总','一夜','暴富') -- 拼接字符串
SELECT INSERT('施总一夜暴富',1,2,'施事') -- 查询，从某个位置开始替换某个长度
SELECT LOWER('Abc')  -- 转小写
SELECT UPPER('Abc')  -- 转大写字符
SELECT INSTR('shizong','i') -- 返回第一次出现的字符串的位置
SELECT REPLACE('shizong','i','施总') -- 替换出现的指定字符串
SELECT SUBSTR('施总好厉害',4,1) -- 返回指定的子字符串（源字符串）
SELECT REVERSE('施总厉害') -- 翻转字符串

-- 查询姓周的同学, 把名字改成姓皱
SELECT REPLACE(studentname,'周','皱') FROM student 
WHERE studentname LIKE '周%'

-- 时间和日期函数（重要）
SELECT CURRENT_DATE() -- 获取当前日期
SELECT CURRENT_TIME() -- 获取当前的时间
SELECT NOW() -- 获取当前的时间
SELECT SYSDATE() -- 系统时间
SELECT LOCALTIME() -- 本地时间

-- 系统
SELECT SYSTEM_USER()
SELECT USER()
SELECT VERSION()
```

### 5.2、聚合函数（常用）

| 函数名称 | 描述   |
| -------- | ------ |
| COUNT()  | 计数   |
| SUM()    | 求和   |
| AVG()    | 平均值 |
| MAX()    | 最大值 |
| MIN()    | 最小值 |
| 。。。。 |        |

```sql
-- =======聚合函数==========
-- 都能够统计 表中的数据 （想查询一个表中有多少个记录，就使用count()）
SELECT COUNT(studentname) FROM student -- count(字段)，会忽略所有的 null值
SELECT COUNT(*) FROM STUDENT -- count(*) 不会忽略所有的null值
SELECT COUNT(1) FROM STUDENT  -- count(1),  不会忽略所有的null 本质是计算行数

SELECT SUM(`studentresult`) AS '总和' FROM result
SELECT AVG(`studentresult`) AS '平均分' FROM result
SELECT MAX(`studentresult`) AS '最高分' FROM result
SELECT MIN(`studentresult`) AS '最低分' FROM result
```

### 5.3 、数据库级别的MD5加密（扩展）

MD5不可逆，具体的值的MD5是一样的

MD5 破解网站的原理，背后有一个字典，MD5加密后的值，加密的前值

```sql
UPDATE user_info SET `password`=MD5(`password`)
INSERT INTO user_info VALUES(4,'范彩','12',MD5('fancai.121'))
SELECT * FROM user_info WHERE `name`='范彩' AND `password`=MD5('fancai.121')
```

## 6、事务

### 6.1、什么是事务

`要么都成功，要么都失败`

> 事务原则：ACID原则，原子性，隔离性，一致性，持久性 （脏读，幻读）

**原子性**

要么都成功，要么都失败

**一致性**

事务前后的数据完整性要保证一致

**持久性 ** -- 事务提交

**隔离性**

事务的隔离性是多个用户并发访问数据时，数据库为每一个用户开启的事务，不能被其他事务的操作所影响到

> 隔离所导致的一些问题

**脏读**

指一个事务读取了另外一个事务未提交的数据

**不可重复读**

在一个事物内读取表中的某一行数据，多次读取结果不同。

**虚读**

是指在一个事物内读取到了别的事务插入的数据，导致前后读不一致

```sql
-- ====== 事务
SET autocommit = 0 -- 关闭
SET autocommit = 1 -- 开启（默认）

-- 手动处理事务
SET autocommit = 0 -- 关闭自动提交
-- 事务开启
START TRANSACTION -- 标记一个事务的开始，从这个之后的sql 都在同一个食物内

INSERT xxx
INSERT XXX

-- 提交： 持久化
COMMIT
-- 回滚：回到的原来的样子
ROLLBACK 

-- 事务结束
SET autocommit = 1 -- 开启自动提交

CREATE TABLE `account` (
  `id` INT(3) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL,
	`money` DECIMAL(9,2) NOT NULL,
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

INSERT INTO account(`name`,`money`) VALUES('施浩',20000),('周俊杰', 100000)
-- 模拟转账
SET autocommit = 0; -- 关闭自动提交
START TRANSACTION -- 开启事务

UPDATE account SET money=money-500 WHERE `name`='施浩'
UPDATE account SET money=money+500 WHERE `name`='周俊杰'

COMMIT -- 提交事务 ，假如提交了就持久化了 不可逆
ROLLBACK -- 回滚

SET autocommit = 1 -- 恢复默认值
```

## 7、索引

### 7.1、索引的分类

> 在一个表中，主键索引只能有一个，唯一索引可以有多个

- 主键索引 （PRIMARY KEY）

  1. 唯一的标识，主键不可重复，只能有一个列为主键

- 唯一索引

  1. 避免重复的列出现，唯一索引可以重复，多个列都可以标识位 唯一索引

- 常规索引

  1. 默认的 index key 关键词来设置

- 全文索引

  1. 在特定的数据库引擎下才有 myisam
  2. 快速定位数据

  

```sql
-- 显示所有的索引信息
SHOW INDEX FROM student
```

### 7.3、索引原则

- 索引不是越多越好
- 不要对进程变动数据加索引
- 小数据的表不需要加索引
- 索引加在常用来查询的字段

## 8、权限管理的和备份

### 8.1、用户管理
