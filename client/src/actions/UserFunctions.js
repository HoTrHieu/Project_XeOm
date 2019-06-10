import axios from 'axios';

export const register = thongtin => {
    return axios
        .post('/register',{
            HoTen: thongtin.HoTen,
            SoDienThoai: thongtin.SoDienThoai,
            BienSoXe: thongtin.BienSoXe,
            DiaChi: thongtin.DiaChi,
            PassWord: thongtin.PassWord,
            PassWordConfirm: thongtin.PassWordConfirm,
            AnhDaiDien: thongtin.AnhDaiDien,
            AnhXe: thongtin.AnhXe,
            ToaDoHienTai: thongtin.ToaDoHienTai,

            UserName: thongtin.SoDienThoai,
            TinhTrang: thongtin.TinhTrang,
            LoaiTaiKhoan: thongtin.LoaiTaiKhoan
        })
}

export const login = taikhoan =>{
    return axios
        .post('/login', {
            UserName:  taikhoan.UserName,
            PassWord: taikhoan.PassWord,
        })
        .then(res=>{
            console.log('login set tai khoan', res.data);
            if(res.data.user){
                localStorage.setItem('taikhoan', JSON.stringify(res.data))
                return res.data
            }
            else    
                return res.data
        })
        .catch(error=>{
            console.log(error);
        })
}