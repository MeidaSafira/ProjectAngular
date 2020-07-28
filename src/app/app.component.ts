import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TambahDataComponent } from './tambah-data/tambah-data.component';
import { DetailDataComponent } from './detail-data/detail-data.component';
import { DialogKonfirmasiComponent } from './dialog-konfirmasi/dialog-konfirmasi.component';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aplikasiCRUD';
  constructor(
    public dialog:MatDialog,
    public api:ApiService
    )
  {
    this.getData(); //kode tambahan
  }
  dataSiswa:any=[];
      getData()
      {
        this.api.baca().subscribe(res=>{
      this.dataSiswa=res;
      })
    }
    //fungsi untuk menampilkan dialog penambahan data baru
    buat()
  {
    const dialogRef = this.dialog.open(TambahDataComponent, {
      width: '450px', 
      data:null     
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData(); // data diambil lagi dari server saat dialog tertutup
    });
  }
  detail(item)
      {
        const dialogRef = this.dialog.open(DetailDataComponent, {
          width: '450px',  
          data:item
        });	
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');     
        });
    }
    konfirmasiHapus(id)
    {
       const dialogRef = this.dialog.open(DialogKonfirmasiComponent, {
         width: '450px',      
       });
       dialogRef.afterClosed().subscribe(result => {
         if(result == true)
         {
           console.log('Menghapus data');
           this.api.hapus(id).subscribe(res=>{
           
           this.getData();
           })
         }
       });
    }
    edit(data)
    {
      const dialogRef = this.dialog.open(TambahDataComponent, {
        width: '450px',
        data:data
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getData();    
      });
    }
  }