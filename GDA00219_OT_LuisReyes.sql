USE [master]
GO
CREATE DATABASE [GDA00219_OT_LuisReyes]
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GDA00219_OT_LuisReyes].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ARITHABORT OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET  ENABLE_BROKER 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET RECOVERY FULL 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET  MULTI_USER 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'GDA00219_OT_LuisReyes', N'ON'
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET QUERY_STORE = ON
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [GDA00219_OT_LuisReyes]
GO
/****** Object:  UserDefinedFunction [dbo].[cifrarPassword]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[cifrarPassword](@password VARCHAR(255))
RETURNS VarBinary(8000)
AS
BEGIN
	declare @pass As VarBinary(8000)
	-- diciembre2024 llave para cifrar el campo password
	set @pass = ENCRYPTBYPASSPHRASE('diciembre2024', @password);
	return @pass;
end;


GO
/****** Object:  UserDefinedFunction [dbo].[verPassword]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[verPassword](@password VARCHAR(255))
RETURNS VarBinary(8000)
AS
Begin
	declare @pass As VarBinary(8000)
	-- diciembre2024 es la llave para descifrar el campo password
	set @pass = DECRYPTBYPASSPHRASE('diciembre2024', @password)
	return @pass;
end;
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[id_producto] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[codigo] [varchar](45) NULL,
	[stock] [float] NULL,
	[precio] [float] NULL,
	[fecha_creacion] [datetime] NULL,
	[foto] [varchar](255) NULL,
	[id_usuario] [int] NOT NULL,
	[id_categoria_producto] [int] NOT NULL,
	[id_estado] [int] NOT NULL,
	[id_marca] [int] NOT NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[id_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Productos_En_Stock]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Productos_En_Stock]
AS
SELECT 
    COUNT(ID_Producto) AS TotalProductosActivosEnStock
FROM 
    Producto
WHERE 
    id_estado = 1 AND Stock > 0;
GO
/****** Object:  Table [dbo].[Orden]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orden](
	[id_orden] [int] IDENTITY(1,1) NOT NULL,
	[fecha_creacion] [datetime] NULL,
	[nombre] [varchar](40) NULL,
	[direccion] [varchar](40) NULL,
	[telefono] [varchar](12) NULL,
	[correo_electronico] [varchar](40) NULL,
	[fecha_entrega] [date] NULL,
	[total_orden] [float] NULL,
	[id_usuario] [int] NOT NULL,
	[id_estado] [int] NOT NULL,
 CONSTRAINT [PK_Orden] PRIMARY KEY CLUSTERED 
(
	[id_orden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Total_Quetzales_Agosto]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Total_Quetzales_Agosto]
AS
SELECT SUM(total_orden) AS TotalQuetzales
FROM Orden
WHERE YEAR(fecha_creacion) = 2024 AND MONTH(fecha_creacion) = 8;
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[id_cliente] [int] IDENTITY(1,1) NOT NULL,
	[razon_social] [varchar](50) NULL,
	[nombre_comercial] [varchar](50) NULL,
	[direccion_entrega] [varchar](150) NULL,
	[telefono] [varchar](8) NULL,
	[email] [varchar](70) NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[id_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[correo_electronico] [varchar](60) NULL,
	[nombre] [varchar](80) NULL,
	[password] [varchar](255) NULL,
	[telefono] [varchar](11) NULL,
	[fecha_nacimiento] [date] NULL,
	[fecha_creacion] [datetime] NULL,
	[id_rol] [int] NOT NULL,
	[id_cliente] [int] NULL,
	[id_estado] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Clientes_TOP10_CONSUMO]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Clientes_TOP10_CONSUMO]
AS
SELECT TOP 10
    cli.nombre_comercial,
    cli.id_cliente,
    SUM(ord.total_orden) AS TotalConsumo
FROM Orden ord
INNER JOIN Usuario usu ON ord.id_usuario = usu.id_usuario
INNER JOIN Cliente cli ON usu.id_cliente = cli.id_cliente
GROUP BY 
	cli.id_cliente, cli.nombre_comercial
ORDER BY 
    TotalConsumo DESC;
GO
/****** Object:  Table [dbo].[OrdenDetalle]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrdenDetalle](
	[cantidad] [int] NULL,
	[precio] [float] NULL,
	[subtotal] [float] NULL,
	[id_producto] [int] NULL,
	[id_orden] [int] NOT NULL,
	[id_orden_detalle] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_OrdenDetalle] PRIMARY KEY CLUSTERED 
(
	[id_orden_detalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Productos_Mas_Vendidos_Ascendente]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Productos_Mas_Vendidos_Ascendente]
AS
SELECT TOP 10
    pro.nombre,
    pro.id_producto,
    SUM(ord.cantidad) AS Total_Ventas
FROM OrdenDetalle ord
INNER JOIN Producto pro ON ord.id_producto = pro.id_producto
GROUP BY pro.id_producto, pro.nombre
ORDER BY Total_Ventas ASC;
GO
/****** Object:  View [dbo].[Productos]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Productos]
AS
SELECT * from Producto;
GO
/****** Object:  Table [dbo].[Marca]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marca](
	[id_marca] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[id_estado] [int] NOT NULL,
 CONSTRAINT [PK_Marca] PRIMARY KEY CLUSTERED 
(
	[id_marca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Marca_activa]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Marca_activa]
AS
SELECT * from Marca where id_estado =1;
GO
/****** Object:  View [dbo].[Marca_inactiva]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Marca_inactiva]
AS
SELECT * from Marca where id_estado =2;
GO
/****** Object:  Table [dbo].[CategoriaProducto]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoriaProducto](
	[id_categoria_producto] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[fecha_creacion] [datetime] NULL,
	[id_estado] [int] NOT NULL,
 CONSTRAINT [PK_CategoriaProducto] PRIMARY KEY CLUSTERED 
(
	[id_categoria_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Categoria_producto_activa]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Categoria_producto_activa]
AS
SELECT * from CategoriaProducto where id_estado =1;
GO
/****** Object:  View [dbo].[Categoria_producto_inactiva]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Categoria_producto_inactiva]
AS
SELECT * from CategoriaProducto where id_estado =2;
GO
/****** Object:  View [dbo].[Usuario_activo]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Usuario_activo]
AS
SELECT * from Usuario where id_estado =1;
GO
/****** Object:  View [dbo].[Usuario_inactivo]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Usuario_inactivo]
AS
SELECT * from Usuario where id_estado =2;
GO
/****** Object:  View [dbo].[Ordenes]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Ordenes]
AS
SELECT * from Orden where id_estado =1;
GO
/****** Object:  Table [dbo].[Estado]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estado](
	[id_estado] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
 CONSTRAINT [PK_Estado] PRIMARY KEY CLUSTERED 
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[id_rol] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
 CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CategoriaProducto] ON 

INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (4, N'Lacteos', CAST(N'2024-12-20T19:06:43.220' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (5, N'coca cola', CAST(N'2024-12-20T23:42:26.940' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (6, N'Lacteos actualizar', CAST(N'2024-12-20T23:43:24.320' AS DateTime), 2)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (7, N'coca cola', CAST(N'2024-12-20T23:50:42.127' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (8, N'coca cola', CAST(N'2024-12-20T23:51:04.553' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (9, N'coca cola', CAST(N'2024-12-21T00:21:44.000' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (10, N'coca cola', CAST(N'2024-12-21T00:22:56.760' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (11, N'coca cola', CAST(N'2024-12-21T00:27:59.653' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (12, N'coca cola', CAST(N'2024-12-21T01:16:49.427' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (13, N'coca cola', CAST(N'2024-12-21T01:17:42.280' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (14, N'coca cola', CAST(N'2024-12-21T01:19:54.330' AS DateTime), 1)
INSERT [dbo].[CategoriaProducto] ([id_categoria_producto], [nombre], [fecha_creacion], [id_estado]) VALUES (15, N'Lacteos actualizar', CAST(N'2024-12-23T03:51:47.893' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[CategoriaProducto] OFF
GO
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([id_cliente], [razon_social], [nombre_comercial], [direccion_entrega], [telefono], [email]) VALUES (1, N'tienda bendicion', N'tienda la bendicion', N'ciudad', N'45678901', N'cliente@mail.mail')
SET IDENTITY_INSERT [dbo].[Cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[Estado] ON 

INSERT [dbo].[Estado] ([id_estado], [nombre]) VALUES (1, N'Activo')
INSERT [dbo].[Estado] ([id_estado], [nombre]) VALUES (2, N'Inactivo')
INSERT [dbo].[Estado] ([id_estado], [nombre]) VALUES (3, N'Historial')
SET IDENTITY_INSERT [dbo].[Estado] OFF
GO
SET IDENTITY_INSERT [dbo].[Marca] ON 

INSERT [dbo].[Marca] ([id_marca], [nombre], [id_estado]) VALUES (1, N'Nestle', 2)
SET IDENTITY_INSERT [dbo].[Marca] OFF
GO
SET IDENTITY_INSERT [dbo].[Orden] ON 

INSERT [dbo].[Orden] ([id_orden], [fecha_creacion], [nombre], [direccion], [telefono], [correo_electronico], [fecha_entrega], [total_orden], [id_usuario], [id_estado]) VALUES (5, CAST(N'2024-12-23T03:42:44.480' AS DateTime), N'Juan Pérez', N'Av. Siempre Viva 123', N'5551234567', N'juan.perez@example.com', CAST(N'2024-12-30' AS Date), 0, 1, 1)
INSERT [dbo].[Orden] ([id_orden], [fecha_creacion], [nombre], [direccion], [telefono], [correo_electronico], [fecha_entrega], [total_orden], [id_usuario], [id_estado]) VALUES (6, CAST(N'2024-12-23T04:59:26.360' AS DateTime), N'Luis Reyes', N'Calle Ficticia 123', N'89890932', N'luis@mail.com', CAST(N'2024-12-25' AS Date), 0, 1, 1)
INSERT [dbo].[Orden] ([id_orden], [fecha_creacion], [nombre], [direccion], [telefono], [correo_electronico], [fecha_entrega], [total_orden], [id_usuario], [id_estado]) VALUES (7, CAST(N'2024-12-23T05:01:37.053' AS DateTime), N'Luis Reyes', N'Calle Ficticia 123', N'89890932', N'luis@mail.com', CAST(N'2024-12-25' AS Date), 0, 1, 1)
INSERT [dbo].[Orden] ([id_orden], [fecha_creacion], [nombre], [direccion], [telefono], [correo_electronico], [fecha_entrega], [total_orden], [id_usuario], [id_estado]) VALUES (8, CAST(N'2024-12-23T05:02:38.973' AS DateTime), N'Luis Reyes', N'Calle Ficticia 123', N'89890932', N'luis@mail.com', CAST(N'2024-12-25' AS Date), 0, 1, 2)
SET IDENTITY_INSERT [dbo].[Orden] OFF
GO
SET IDENTITY_INSERT [dbo].[OrdenDetalle] ON 

INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (2, 100.5, 201, 8, 5, 5)
INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (NULL, NULL, NULL, NULL, 6, 6)
INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (NULL, NULL, NULL, NULL, 6, 7)
INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (NULL, NULL, NULL, NULL, 7, 8)
INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (NULL, NULL, NULL, NULL, 7, 9)
INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (NULL, NULL, NULL, NULL, 8, 10)
INSERT [dbo].[OrdenDetalle] ([cantidad], [precio], [subtotal], [id_producto], [id_orden], [id_orden_detalle]) VALUES (NULL, NULL, NULL, NULL, 8, 11)
SET IDENTITY_INSERT [dbo].[OrdenDetalle] OFF
GO
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([id_producto], [nombre], [codigo], [stock], [precio], [fecha_creacion], [foto], [id_usuario], [id_categoria_producto], [id_estado], [id_marca]) VALUES (8, N'coca cola', N'1010', 0, 0, CAST(N'2024-12-21T02:05:00.777' AS DateTime), N'h', 1, 4, 2, 1)
INSERT [dbo].[Producto] ([id_producto], [nombre], [codigo], [stock], [precio], [fecha_creacion], [foto], [id_usuario], [id_categoria_producto], [id_estado], [id_marca]) VALUES (9, N'coca cola', N'1010', 0, 0, CAST(N'2024-12-21T02:05:12.577' AS DateTime), N'h', 1, 4, 1, 1)
INSERT [dbo].[Producto] ([id_producto], [nombre], [codigo], [stock], [precio], [fecha_creacion], [foto], [id_usuario], [id_categoria_producto], [id_estado], [id_marca]) VALUES (10, N'coca cola', N'1010', 0, 0, CAST(N'2024-12-21T02:11:36.813' AS DateTime), N'http://localhost:8080/uploads/coca-1734768696776.p', 1, 4, 1, 1)
SET IDENTITY_INSERT [dbo].[Producto] OFF
GO
SET IDENTITY_INSERT [dbo].[Rol] ON 

INSERT [dbo].[Rol] ([id_rol], [nombre]) VALUES (1, N'Admin')
INSERT [dbo].[Rol] ([id_rol], [nombre]) VALUES (2, N'Cliente')
INSERT [dbo].[Rol] ([id_rol], [nombre]) VALUES (3, N'Operador')
SET IDENTITY_INSERT [dbo].[Rol] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([id_usuario], [correo_electronico], [nombre], [password], [telefono], [fecha_nacimiento], [fecha_creacion], [id_rol], [id_cliente], [id_estado]) VALUES (1, N'admin@mail.mail', N'administrador', N'$2b$10$CI4s9.vPM./BwcgFNdDRSudVOWnFog8LyNYwdktKg57nsOTdHLeja', N'44558990', CAST(N'2000-01-01' AS Date), NULL, 1, NULL, 1)
INSERT [dbo].[Usuario] ([id_usuario], [correo_electronico], [nombre], [password], [telefono], [fecha_nacimiento], [fecha_creacion], [id_rol], [id_cliente], [id_estado]) VALUES (2, N'operador@mail.mail', N'Operador', N'$2b$10$EwtcelFoo2AT999cAeb73OmWNbWf/mZviBvYbWfLXVAgLDgKbdsEW', N'53482243', CAST(N'2000-10-10' AS Date), CAST(N'2024-12-23T01:09:42.980' AS DateTime), 2, NULL, 1)
INSERT [dbo].[Usuario] ([id_usuario], [correo_electronico], [nombre], [password], [telefono], [fecha_nacimiento], [fecha_creacion], [id_rol], [id_cliente], [id_estado]) VALUES (3, N'operador2@mail.mail', N'Operador_2', N'$2b$10$eZeF.q8TTL6V513xovraNOMpErPruDvzXbGHXR0W2//Iw1Kcq9feS', N'45678901', CAST(N'1998-05-22' AS Date), CAST(N'2024-12-23T01:14:52.900' AS DateTime), 2, NULL, 2)
INSERT [dbo].[Usuario] ([id_usuario], [correo_electronico], [nombre], [password], [telefono], [fecha_nacimiento], [fecha_creacion], [id_rol], [id_cliente], [id_estado]) VALUES (4, N'cliente@mail.mail', N'tienda la bendicion', N'$2b$10$hPV30VD08X8jB7dmvcyhDO6f5HPcg02NHYEicjJUnqnb5qRZtlJyG', N'45678901', CAST(N'1998-05-22' AS Date), CAST(N'2024-12-24T02:47:49.147' AS DateTime), 3, 1, 2)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[CategoriaProducto]  WITH CHECK ADD  CONSTRAINT [Estado_CategoriaProducto] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estado] ([id_estado])
GO
ALTER TABLE [dbo].[CategoriaProducto] CHECK CONSTRAINT [Estado_CategoriaProducto]
GO
ALTER TABLE [dbo].[Marca]  WITH CHECK ADD  CONSTRAINT [Estado_Marca] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estado] ([id_estado])
GO
ALTER TABLE [dbo].[Marca] CHECK CONSTRAINT [Estado_Marca]
GO
ALTER TABLE [dbo].[Orden]  WITH CHECK ADD  CONSTRAINT [Estado_Orden] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estado] ([id_estado])
GO
ALTER TABLE [dbo].[Orden] CHECK CONSTRAINT [Estado_Orden]
GO
ALTER TABLE [dbo].[Orden]  WITH CHECK ADD  CONSTRAINT [Usuario_Orden] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])
GO
ALTER TABLE [dbo].[Orden] CHECK CONSTRAINT [Usuario_Orden]
GO
ALTER TABLE [dbo].[OrdenDetalle]  WITH CHECK ADD  CONSTRAINT [Orden_OrdenDetalle] FOREIGN KEY([id_orden])
REFERENCES [dbo].[Orden] ([id_orden])
GO
ALTER TABLE [dbo].[OrdenDetalle] CHECK CONSTRAINT [Orden_OrdenDetalle]
GO
ALTER TABLE [dbo].[OrdenDetalle]  WITH CHECK ADD  CONSTRAINT [Producto_OrdenDetalle] FOREIGN KEY([id_producto])
REFERENCES [dbo].[Producto] ([id_producto])
GO
ALTER TABLE [dbo].[OrdenDetalle] CHECK CONSTRAINT [Producto_OrdenDetalle]
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD  CONSTRAINT [CategoriaProducto_Producto] FOREIGN KEY([id_categoria_producto])
REFERENCES [dbo].[CategoriaProducto] ([id_categoria_producto])
GO
ALTER TABLE [dbo].[Producto] CHECK CONSTRAINT [CategoriaProducto_Producto]
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD  CONSTRAINT [Estado_Producto] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estado] ([id_estado])
GO
ALTER TABLE [dbo].[Producto] CHECK CONSTRAINT [Estado_Producto]
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD  CONSTRAINT [Marca_Producto] FOREIGN KEY([id_marca])
REFERENCES [dbo].[Marca] ([id_marca])
GO
ALTER TABLE [dbo].[Producto] CHECK CONSTRAINT [Marca_Producto]
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD  CONSTRAINT [Usuario_Producto] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])
GO
ALTER TABLE [dbo].[Producto] CHECK CONSTRAINT [Usuario_Producto]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [Cliente_Usuario] FOREIGN KEY([id_cliente])
REFERENCES [dbo].[Cliente] ([id_cliente])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [Cliente_Usuario]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [Estado_Usuario] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estado] ([id_estado])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [Estado_Usuario]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [Rol_Usuario] FOREIGN KEY([id_rol])
REFERENCES [dbo].[Rol] ([id_rol])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [Rol_Usuario]
GO
/****** Object:  StoredProcedure [dbo].[BuscarUsuarioPorCorreo]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarUsuarioPorCorreo]
    @email NVARCHAR(255)
AS
BEGIN
    DECLARE @UsuarioExistente INT;

    SELECT @UsuarioExistente = COUNT(*) 
    FROM Usuario
    WHERE correo_electronico = @email;

    IF @UsuarioExistente > 0
    BEGIN
        SELECT *  from usuario where correo_electronico = @email ;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[CategoriaListar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[CategoriaListar]
	@Page INT = 1,   -- Página actual
    @Limit INT = 10,
    @Search NVARCHAR(255) = ''
AS
BEGIN
	SET NOCOUNT ON;

    -- Consulta para obtener el total de registros (sin paginación)
    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*)
    FROM CategoriaProducto AS cat
    INNER JOIN Estado AS est ON cat.id_estado = est.id_estado
    WHERE cat.nombre LIKE '%' + @Search + '%';


	SELECT 
        cat.id_categoria_producto, 
        cat.nombre,
		cat.fecha_creacion, 
        est.nombre AS estado
    FROM CategoriaProducto AS cat
    INNER JOIN Estado AS est ON cat.id_estado = est.id_estado
    WHERE cat.nombre LIKE '%' + @Search + '%'
    ORDER BY cat.id_categoria_producto DESC
    OFFSET (@Page - 1) * @Limit ROWS
    FETCH NEXT @Limit ROWS ONLY;

	SELECT @TotalCount AS Total;
END;
GO
/****** Object:  StoredProcedure [dbo].[CategoriaProductoActualizar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[CategoriaProductoActualizar]
@P_NOMBRE VARCHAR(45),
@P_ID_CATEGORIA_PRODUCTO INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE CategoriaProducto set nombre = @P_NOMBRE
			WHERE id_categoria_producto = @P_ID_CATEGORIA_PRODUCTO;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[CategoriaProductoEliminar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[CategoriaProductoEliminar]
@P_ID_CATEGORIA_PRODUCTO INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE CategoriaProducto set id_estado = 2
			WHERE id_categoria_producto = @P_ID_CATEGORIA_PRODUCTO;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[CategoriaProductoInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[CategoriaProductoInsertar]
@P_NOMBRE VARCHAR(45)
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			INSERT INTO CategoriaProducto(nombre, fecha_creacion, id_estado)
			VALUES(@P_NOMBRE, GETDATE(), 1)
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[ClienteActualizar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ClienteActualizar]
    @P_RAZON_SOCIAL VARCHAR(255),
    @P_NOMBRE_COMERCIAL VARCHAR(255),
    @P_DIRECCION_ENTREGA VARCHAR(255),
    @P_TELEFONO VARCHAR(20),
    @P_EMAIL VARCHAR(100),
	@P_ID_CLIENTE INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Iniciar una transacción para asegurar la integridad de los datos
        BEGIN TRANSACTION;
		
		UPDATE Cliente set 
			razon_social  = @P_RAZON_SOCIAL,
			nombre_comercial = @P_NOMBRE_COMERCIAL,
			direccion_entrega = @P_DIRECCION_ENTREGA,
			telefono = @P_TELEFONO,
			email = @P_EMAIL

		WHERE id_cliente = @P_ID_CLIENTE;

        -- Confirmar la transacción si todo ha ido bien
        COMMIT TRANSACTION;
        
        
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[ClienteEliminar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ClienteEliminar]
@P_ID_CLIENTE INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Usuario set id_estado = 2
			WHERE id_cliente = @P_ID_CLIENTE;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[ClienteListar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ClienteListar]
	@Page INT = 1,   -- Página actual
    @Limit INT = 10,
    @Search NVARCHAR(255) = ''
AS
BEGIN
	SET NOCOUNT ON;

    -- Consulta para obtener el total de registros (sin paginación)
    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*)
    FROM Cliente AS cli
	INNER JOIN Usuario AS usu ON cli.id_cliente = usu.id_cliente
    INNER JOIN Estado AS est ON usu.id_estado = est.id_estado
    WHERE cli.nombre_comercial LIKE '%' + @Search + '%';


	SELECT 
        cli.id_cliente,
		cli.razon_social,
		cli.nombre_comercial,
		cli.telefono,
		cli.direccion_entrega,
		cli.email,
		usu.nombre AS usuario
   FROM Cliente AS cli
	INNER JOIN Usuario AS usu ON cli.id_cliente = usu.id_cliente
    INNER JOIN Estado AS est ON usu.id_estado = est.id_estado
    WHERE cli.nombre_comercial LIKE '%' + @Search + '%'
    ORDER BY cli.id_cliente DESC
    OFFSET (@Page - 1) * @Limit ROWS
    FETCH NEXT @Limit ROWS ONLY;

	SELECT @TotalCount AS Total;
END;
GO
/****** Object:  StoredProcedure [dbo].[MarcaActualizar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[MarcaActualizar]
@P_NOMBRE VARCHAR(45),
@P_ID_MARCA INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Marca set nombre = @P_NOMBRE
			WHERE id_marca = @P_ID_MARCA;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[MarcaEliminar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[MarcaEliminar]
@P_ID_MARCA INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Marca set id_estado = 2
			WHERE id_marca = @P_ID_MARCA;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[MarcaInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[MarcaInsertar]
@P_NOMBRE VARCHAR(45)
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			INSERT INTO Marca(nombre, id_estado)
			VALUES(@P_NOMBRE, 1)
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[MarcaListar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[MarcaListar]
	@Page INT = 1,   -- Página actual
    @Limit INT = 10,
    @Search NVARCHAR(255) = ''
AS
BEGIN
	SET NOCOUNT ON;

    -- Consulta para obtener el total de registros (sin paginación)
    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*)
    FROM Marca AS mar
    INNER JOIN Estado AS est ON mar.id_estado = est.id_estado
    WHERE mar.nombre LIKE '%' + @Search + '%';


	SELECT 
        mar.id_marca, 
        mar.nombre, 
        est.nombre AS estado
    FROM Marca AS mar
    INNER JOIN Estado AS est ON mar.id_estado = est.id_estado
    WHERE mar.nombre LIKE '%' + @Search + '%'
    ORDER BY mar.id_marca DESC
    OFFSET (@Page - 1) * @Limit ROWS
    FETCH NEXT @Limit ROWS ONLY;

	SELECT @TotalCount AS Total;
END;
GO
/****** Object:  StoredProcedure [dbo].[OrdenActualizarEstado]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[OrdenActualizarEstado]
@P_ID_ORDEN INT,
@P_ID_ESTADO INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Orden set id_estado = @P_ID_ESTADO
			WHERE id_orden = @P_ID_ORDEN;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[OrdenDetalleInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[OrdenDetalleInsertar]
@P_CANTIDAD INT,
@P_PRECIO FLOAT,
@P_ID_PRODUCTO INT,
@P_ID_ORDEN INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			DECLARE @PC_SUBTOTAL FLOAT;
			DECLARE @PC_TOTAL FLOAT;
			DECLARE @PC_STOCK_INICIAL FLOAT;
			DECLARE @PC_STOCK_FINAL FLOAT;
			
			SET @PC_SUBTOTAL = @P_CANTIDAD * @P_PRECIO;
			INSERT INTO OrdenDetalle(cantidad,precio,subtotal,id_producto,id_orden)
			VALUES(@P_CANTIDAD,@P_PRECIO,@PC_SUBTOTAL, @P_ID_PRODUCTO, @P_ID_ORDEN)

			SELECT @PC_STOCK_INICIAL = stock from Producto where id_producto = @P_ID_PRODUCTO;

			SET @PC_STOCK_FINAL = @PC_STOCK_INICIAL - @P_CANTIDAD;

			--OBTENEMOS EL TOTAL DE ORDEN
			select @PC_TOTAL = total_orden from Orden where id_orden = @P_ID_ORDEN;
			--ASIGNAMOS NUEVO TOTAL A LA ORDEN
			set @PC_TOTAL = @PC_TOTAL + @PC_SUBTOTAL;

			UPDATE Producto set stock = @PC_STOCK_FINAL
			WHERE id_producto = @P_ID_PRODUCTO;

			UPDATE Orden set total_orden = @PC_TOTAL
			where id_orden= @P_ID_ORDEN;

		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK

		DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;


		SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Devolver el mensaje de error con más detalles
        RAISERROR('Error al insertar producto: %s', @ErrorSeverity, @ErrorState, @ErrorMessage);
        
        -- También se puede devolver el error como un conjunto de resultados
        SELECT 
            ErrorMessage = @ErrorMessage,
            ErrorSeverity = @ErrorSeverity,
            ErrorState = @ErrorState;
	END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[OrdenEliminar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[OrdenEliminar]
@P_ID_ORDEN INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Orden set id_estado = 2
			WHERE id_orden = @P_ID_ORDEN;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[OrdenInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[OrdenInsertar]
@P_NOMBRE VARCHAR(45),
@P_DIRECCION VARCHAR(45),
@P_TELEFONO VARCHAR(12),
@P_CORREO_ELECTRONICO VARCHAR(40),
@P_FECHA_ENTREGA DATE,
@P_ID_USUARIO INT,
@P_DETALLE NVARCHAR(MAX)
AS
BEGIN
    DECLARE @id_orden INT;
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Insertar en la tabla Orden
        INSERT INTO Orden(fecha_creacion, nombre, direccion, telefono, correo_electronico, fecha_entrega, total_orden, id_usuario, id_estado)
        VALUES (GETDATE(), @P_NOMBRE, @P_DIRECCION, @P_TELEFONO, @P_CORREO_ELECTRONICO, @P_FECHA_ENTREGA, 0, @P_ID_USUARIO, 1);

        -- Obtener el ID de la orden recién insertada
        SET @id_orden = SCOPE_IDENTITY();

        -- Insertar en la tabla OrdenDetalle usando los datos del parámetro @P_DETALLE (JSON)
        INSERT INTO OrdenDetalle(cantidad, precio, subtotal, id_producto, id_orden)
        SELECT P_CANTIDAD, P_PRECIO, PC_SUBTOTAL, P_ID_PRODUCTO, @id_orden
        FROM OPENJSON(@P_DETALLE)
        WITH (
            P_CANTIDAD INT,
            P_PRECIO FLOAT,
            PC_SUBTOTAL FLOAT,
            P_ID_PRODUCTO INT
        );

        COMMIT;
    END TRY
    BEGIN CATCH
        -- Rollback en caso de error
        ROLLBACK;
		DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;


		SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Devolver el mensaje de error con más detalles
        RAISERROR('Error al insertar producto: %s', @ErrorSeverity, @ErrorState, @ErrorMessage);
        
        -- También se puede devolver el error como un conjunto de resultados
        SELECT 
            ErrorMessage = @ErrorMessage,
            ErrorSeverity = @ErrorSeverity,
            ErrorState = @ErrorState;

    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[OrdenListar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[OrdenListar]
	@Page INT = 1,   -- Página actual
    @Limit INT = 10
    --@Search NVARCHAR(255) = ''
AS
BEGIN
	SET NOCOUNT ON;

    -- Consulta para obtener el total de registros (sin paginación)
    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*)
    FROM Orden AS pro
    INNER JOIN Estado AS est ON pro.id_estado = est.id_estado
	INNER JOIN Usuario AS usu on pro.id_usuario = usu.id_usuario;
    --WHERE pro.nombre LIKE '%' + @Search + '%';

	SELECT 
		ord.id_orden,
		ord.nombre,
		ord.fecha_entrega,
        est.nombre AS estado,
		usu.nombre AS cliente
    FROM Orden AS ord
    INNER JOIN Estado AS est ON ord.id_estado = est.id_estado
	INNER JOIN Usuario AS usu on ord.id_usuario = usu.id_usuario
    ORDER BY ord.id_orden DESC
    OFFSET (@Page - 1) * @Limit ROWS
    FETCH NEXT @Limit ROWS ONLY;

	SELECT @TotalCount AS Total;
END;
GO
/****** Object:  StoredProcedure [dbo].[ProductoActualizar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[ProductoActualizar]
@P_NOMBRE VARCHAR(45),
@P_CODIGO VARCHAR(45),
@P_STOCK FLOAT,
@P_PRECIO FLOAT,
@P_FOTO BINARY,
@P_ID_USUARIO INT,
@P_ID_CATEGORIA_PRODUCTO INT,
@P_ID_MARCA INT,
@P_ID_PRODUCTO INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Producto set nombre = @P_NOMBRE, 
			codigo =@P_CODIGO, 
			stock = @P_STOCK, 
			precio =@P_PRECIO, 
			foto =@P_FOTO, 
			id_usuario =@P_ID_USUARIO,
			id_categoria_producto =@P_ID_CATEGORIA_PRODUCTO, 
			id_marca = @P_ID_MARCA
			WHERE id_producto = @P_ID_PRODUCTO
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[ProductoEliminar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[ProductoEliminar]
@P_ID_PRODUCTO INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Producto set id_estado = 2
			WHERE id_producto = @P_ID_PRODUCTO;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[ProductoInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ProductoInsertar]
@P_NOMBRE VARCHAR(45),
@P_CODIGO VARCHAR(45),
@P_STOCK FLOAT,
@P_PRECIO FLOAT,
@P_FOTO VARCHAR(255),
@P_ID_USUARIO INT,
@P_ID_CATEGORIA_PRODUCTO INT,
@P_ID_MARCA INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			INSERT INTO Producto(nombre, codigo, stock, precio, fecha_creacion, foto, id_usuario,id_categoria_producto, id_estado, id_marca)
			VALUES(@P_NOMBRE, @P_CODIGO, @P_STOCK, @P_PRECIO, GETDATE(), @P_FOTO, @P_ID_USUARIO, @P_ID_CATEGORIA_PRODUCTO, 1, @P_ID_MARCA)
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK

		DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;


		SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Devolver el mensaje de error con más detalles
        RAISERROR('Error al insertar producto: %s', @ErrorSeverity, @ErrorState, @ErrorMessage);
        
        -- También se puede devolver el error como un conjunto de resultados
        SELECT 
            ErrorMessage = @ErrorMessage,
            ErrorSeverity = @ErrorSeverity,
            ErrorState = @ErrorState;
	END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[ProductoListar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[ProductoListar]
	@Page INT = 1,   -- Página actual
    @Limit INT = 10,
    @Search NVARCHAR(255) = ''
AS
BEGIN
	SET NOCOUNT ON;

    -- Consulta para obtener el total de registros (sin paginación)
    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*)
    FROM Producto AS pro
    INNER JOIN Estado AS est ON pro.id_estado = est.id_estado
	INNER JOIN Marca AS mar on pro.id_marca = mar.id_marca
	INNER JOIN CategoriaProducto AS cat on pro.id_categoria_producto = cat.id_categoria_producto
	INNER JOIN Usuario AS usu on pro.id_usuario = usu.id_usuario
    WHERE pro.nombre LIKE '%' + @Search + '%';


	SELECT 
        pro.id_producto,
		pro.nombre,
		pro.codigo,
		pro.stock,
		pro.precio,
		pro.fecha_creacion,
		pro.foto,
		pro.id_usuario,
		pro.id_categoria_producto,
		pro.id_estado,
		pro.id_marca, 
        est.nombre AS estado,
		mar.nombre AS marca,
		cat.nombre AS categoria,
		usu.nombre AS usuario
    FROM Producto AS pro
    INNER JOIN Estado AS est ON pro.id_estado = est.id_estado
	INNER JOIN Marca AS mar on pro.id_marca = mar.id_marca
	INNER JOIN CategoriaProducto AS cat on pro.id_categoria_producto = cat.id_categoria_producto
	INNER JOIN Usuario AS usu on pro.id_usuario = usu.id_usuario
    WHERE pro.nombre LIKE '%' + @Search + '%'
    ORDER BY pro.id_producto DESC
    OFFSET (@Page - 1) * @Limit ROWS
    FETCH NEXT @Limit ROWS ONLY;

	SELECT @TotalCount AS Total;
END;
GO
/****** Object:  StoredProcedure [dbo].[UsuarioActualizar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[UsuarioActualizar]
	@P_CORREO_ELECTRONICO VARCHAR(60),
    @P_NOMBRE VARCHAR(80),
    @P_TELEFONO VARCHAR(20),
    @P_FECHA_NACIMIENTO DATE,
	@P_ID_ROL INT, 
	@P_ID_USUARIO INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Iniciar una transacción para asegurar la integridad de los datos
        BEGIN TRANSACTION;

		UPDATE Usuario set 
		correo_electronico = @P_CORREO_ELECTRONICO,
		nombre = @P_NOMBRE,
		telefono = @P_TELEFONO,
		fecha_nacimiento = @P_FECHA_NACIMIENTO,
		id_rol = @P_ID_ROL

		WHERE id_usuario = @P_ID_USUARIO;

        COMMIT TRANSACTION;
       
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[UsuarioClienteInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UsuarioClienteInsertar]
    @P_RAZON_SOCIAL VARCHAR(255),
    @P_NOMBRE_COMERCIAL VARCHAR(255),
    @P_DIRECCION_ENTREGA VARCHAR(255),
    @P_TELEFONO VARCHAR(20),
    @P_EMAIL VARCHAR(100),
    @P_PASSWORD VARCHAR(100),
    @P_FECHA_NACIMIENTO DATE
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Iniciar una transacción para asegurar la integridad de los datos
        BEGIN TRANSACTION;

        -- Insertar el cliente y obtener el id_cliente
        DECLARE @id_cliente INT;

        INSERT INTO Cliente (razon_social, nombre_comercial, direccion_entrega, telefono, email)
        VALUES (@P_RAZON_SOCIAL, @P_NOMBRE_COMERCIAL, @P_DIRECCION_ENTREGA, @P_TELEFONO, @P_EMAIL);

        -- Obtener el id_cliente generado automáticamente
        SET @id_cliente = SCOPE_IDENTITY();

        -- Insertar el usuario asociado al cliente
        INSERT INTO Usuario (correo_electronico,nombre,password,telefono,fecha_nacimiento,fecha_creacion,id_rol,id_cliente,id_estado)
        VALUES (@P_EMAIL,@P_NOMBRE_COMERCIAL,@P_PASSWORD,@P_TELEFONO, @P_FECHA_NACIMIENTO, GETDATE(), 3,  @id_cliente,1);

        -- Confirmar la transacción si todo ha ido bien
        COMMIT TRANSACTION;
        
        -- Mensaje de éxito
        PRINT 'Cliente y Usuario creados correctamente';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[UsuarioEliminar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[UsuarioEliminar]
@P_ID_USUARIO INT
AS
BEGIN
	set NOCOUNT ON;
	BEGIN TRY
		BEGIN TRAN
			UPDATE Usuario set id_estado = 2
			WHERE id_usuario = @P_ID_USUARIO;
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
	END CATCH
END;




GO
/****** Object:  StoredProcedure [dbo].[UsuarioInsertar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UsuarioInsertar]
	@P_CORREO_ELECTRONICO VARCHAR(60),
    @P_NOMBRE VARCHAR(80),
    @P_PASSWORD VARCHAR(255),
    @P_TELEFONO VARCHAR(20),
    @P_FECHA_NACIMIENTO DATE,
	@P_ID_ROL INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;


        INSERT INTO Usuario (correo_electronico,nombre,password,telefono,fecha_nacimiento,fecha_creacion,id_rol,id_cliente,id_estado)
        VALUES (@P_CORREO_ELECTRONICO,@P_NOMBRE,@P_PASSWORD,@P_TELEFONO, @P_FECHA_NACIMIENTO, GETDATE(), @P_ID_ROL,  null,1);

        COMMIT TRANSACTION;
       
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

		DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;


		SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Devolver el mensaje de error con más detalles
        RAISERROR('Error al insertar producto: %s', @ErrorSeverity, @ErrorState, @ErrorMessage);
        
        -- También se puede devolver el error como un conjunto de resultados
        SELECT 
            ErrorMessage = @ErrorMessage,
            ErrorSeverity = @ErrorSeverity,
            ErrorState = @ErrorState;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[UsuarioPasswordActualizar]    Script Date: 24/12/2024 03:27:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[UsuarioPasswordActualizar]
	@P_PASSWORD VARCHAR(255),
	@P_ID_USUARIO INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Iniciar una transacción para asegurar la integridad de los datos
        BEGIN TRANSACTION;

		UPDATE Usuario set 
		password = @P_PASSWORD
		WHERE id_usuario = @P_ID_USUARIO;

        COMMIT TRANSACTION;
       
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
    END CATCH
END;
GO
USE [master]
GO
ALTER DATABASE [GDA00219_OT_LuisReyes] SET  READ_WRITE 
GO
