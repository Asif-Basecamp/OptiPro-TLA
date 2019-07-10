import { Component, Input, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
// import { AnalyticsService } from '../../../@core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'opti-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  private index: number = 0;


  user: any;

  constructor(private sidebarService: NbSidebarService,private userService: UserData,private router: Router) {
   
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.router.navigateByUrl('/pages');    
    if(document.body.contains(document.querySelector(".menu-item > a.active"))){
      document.querySelector(".menu-item > a.active").classList.remove('active');
    }
  }
}
