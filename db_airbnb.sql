CREATE TABLE nguoi_dung (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birthday VARCHAR(10),
    avatar VARCHAR(255) DEFAULT NULL,
    gender BOOLEAN,
    role VARCHAR(50)
);

CREATE TABLE vi_tri (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tenViTri VARCHAR(255) NOT NULL,
    tinhThanh VARCHAR(255) NOT NULL,
    quocGia VARCHAR(255) NOT NULL,
    hinhAnh VARCHAR(255)
);

CREATE TABLE phong (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tenPhong VARCHAR(255) NOT NULL,
    khach INT,
    phongNgu INT,
    giuong INT,
    phongTam INT,
    moTa VARCHAR(255) NOT NULL,
    giaTien INT NOT NULL,
    mayGiat BOOLEAN,
    banLa BOOLEAN,
    tivi BOOLEAN,
    dieuHoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    doXe BOOLEAN,
    hoBoi BOOLEAN,
    banUi BOOLEAN,
    hinhAnh VARCHAR(255) NOT NULL,
    maViTri INT NOT NULL,
    FOREIGN KEY (maViTri) REFERENCES vi_tri(id)
);

CREATE TABLE dat_phong (
    id INT PRIMARY KEY,
    maPhong INT NOT NULL,
    ngayDen DATETIME,
    ngayDi DATETIME,
    soLuongKhach INT,
    maNguoiDung INT,
    FOREIGN KEY (maPhong) REFERENCES phong(id),
    FOREIGN KEY (maNguoiDung) REFERENCES nguoi_dung(id)
);

CREATE TABLE binh_luan (
    id INT NOT NULL PRIMARY KEY,
    maPhong INT,
    maNguoiBinhLuan INT NOT NULL,
    ngayBinhLuan DATETIME ,
    noiDung VARCHAR(255) NOT NULL,
    saoBinhLuan INT NOT NULL,
    FOREIGN KEY (maPhong) REFERENCES dat_phong(id),
    FOREIGN KEY (maNguoiBinhLuan) REFERENCES nguoi_dung(id)
);



INSERT INTO vi_tri (id, tenViTri, tinhThanh, quocGia, hinhAnh) VALUES
(1, 'Quận 1', 'Hồ Chí Minh', 'Việt Nam', 'HinhAnh1'),
(2, 'Hoàn Kiếm', 'Hà Nội','Việt Nam', 'HinhAnh2');


INSERT INTO phong (id, tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, hinhAnh, maViTri) VALUES
(1, 'Phong1', 2, 1, 1, 1, 'Đẹp', 100, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, 'HinhAnh1', 1),
(2, 'Phong2', 4, 2, 2, 2, 'ok', 200, FALSE, false, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'HinhAnh2', 2);


INSERT INTO nguoi_dung (id, name, email, password, phone, birthday, gender, role) VALUES
(1, 'Admin', 'admin@gmail.com', 'password1', '0123456789', '1990-01-01', TRUE, 'ADMIN'),
(2, 'frankie', 'frankie@gmail.com', 'password2', '0987654321', '1991-02-02', FALSE, 'USER');


INSERT INTO dat_phong (id, maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung) VALUES
(1, 1, '2023-07-01 14:00:00', '2023-07-05 12:00:00', 2, 1),
(2, 2, '2023-08-01 14:00:00', '2023-08-05 12:00:00', 4, 2);

INSERT INTO binh_luan (id, maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan) VALUES
(1, 1, 1, '2023-07-06 10:00:00', 'Great room!', 5),
(2, 2, 2, '2023-08-06 11:00:00', 'Very comfortable!', 4);
