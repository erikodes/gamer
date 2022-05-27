import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { games } from "../../../../assets/json/games";

@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

    user: any;
    games: any = [];
    slideOptions = {
        slidesPerView: 'auto'
    };
    bestClips: any = [];
    clips: any = [];

    constructor(
        public api: ApiService,
        public actvRoute: ActivatedRoute,
        public auth: AuthService,
        public modalController: ModalController
    ) {
        this.games = games;

        api.getDocument('users', auth.user).then(data => {
            this.user = data;

            api.getFollowStatus(auth.user)
                .then(followStatus => {
                    this.user.isFollowed = followStatus;
                })
        })
    }

    ngOnInit() {
        this.api.getRef('clips').ref
            .where('userKey', '==', this.auth.user)
            .orderBy('likes', 'desc')
            .limit(10)
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const clip = element.data();
                    clip.$key = element.id;

                    let url = clip.video.url.split('/');

                    clip.video.url = 'https://res.cloudinary.com/dzvclpwar/video/upload/e_reverse,ac_none,c_fill,du_2,h_275,q_60,so_0,w_200/' + url[6] + '/' + url[7];

                    this.bestClips.push(clip);
                });
            });

        this.api.getRef('clips').ref
            .where('userKey', '==', this.auth.user)
            .orderBy('creationDate', 'desc')
            .limit(3)
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const clip = element.data();
                    clip.$key = element.id;

                    let url = clip.video.url.split('/');

                    clip.video.url = 'https://res.cloudinary.com/dzvclpwar/video/upload/f_jpg/' + url[6] + '/' + url[7];
                    this.clips.push(clip);
                });
            });
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
