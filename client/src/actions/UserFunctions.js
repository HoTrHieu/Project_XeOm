import axios from 'axios';

export const register = thongtin => {
    return axios
        .post('/register',{
            HoTen: thongtin.HoTen,
            SoDienThoai: thongtin.SoDienThoai,
            DiaChi: thongtin.DiaChi,
            BienSoXe: thongtin.BienSoXe,
            AnhDaiDien: thongtin.AnhDaiDien,
            AnhXe: thongtin.AnhXe,

            UserName: thongtin.SoDienThoai,
            PassWord: thongtin.PassWord,
            TinhTrang: thongtin.TinhTrang,
            LoaiTaiKhoan: thongtin.LoaiTaiKhoan
        })
}

export const login = taikhoan =>{
    return axios
        .post('/login', {
            UserName:  taikhoan.UserName,
            PassWord: taikhoan.PassWord
        })
        .then(res=>{
            if(res.data.user){
                localStorage.setItem('taikhoan', JSON.stringify(res.data))
                return res.data
            }
            else    
                return res.data
        })
        .catch(err=>{
            console.log(err);
        })
}