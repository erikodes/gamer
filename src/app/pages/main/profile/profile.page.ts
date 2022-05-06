import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuProfileComponent } from 'src/app/components/menu-profile/menu-profile.component';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { games } from "../../../../assets/json/games";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    userKey: any;
    user: any;
    clips: any = [];
    games: any = [];
    slideOptions = {
        slidesPerView: 'auto'
    };

    constructor(
        public api: ApiService,
        public actvRoute: ActivatedRoute,
        public auth: AuthService,
        public modalController: ModalController
    ) {
        this.userKey = this.actvRoute.snapshot.paramMap.get('userKey');

        this.games = games;

        api.getDocument('users', this.userKey).then(data => {
            this.user = data;

            api.getFollowStatus(this.userKey)
                .then(followStatus => {
                    this.user.isFollowed = followStatus;
                })
        })
    }

    ngOnInit() {
        this.api.getRef('clips').ref
            .where('userKey', '==', this.userKey)
            .orderBy('likes', 'desc')
            .limit(10)
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const clip = element.data();
                    clip.$key = element.id;

                    let url = clip.video.url.split('/');

                    clip.video.url = 'https://res.cloudinary.com/dzvclpwar/video/upload/e_reverse,ac_none,c_fill,du_2,h_275,q_60,so_0,w_200/' + url[6] + '/' + url[7];

                    this.clips.push(clip);
                });
            });
    }

    async openMenu() {
        const modal = await this.modalController.create({
            component: MenuProfileComponent,
            cssClass: 'menu-modal menu-profile-modal',
            swipeToClose: true
        });

        return await modal.present();
    }

    followUser() {
        if (this.user.isFollowed) {
            this.user.followers -= 1;
        } else {
            this.user.followers += 1;
        }
        this.api.updateFollowStatus(this.user);
        this.user.isFollowed = !this.user.isFollowed;
    }
}
