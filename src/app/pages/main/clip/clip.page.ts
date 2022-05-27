/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';
import { ModalController, NavController } from '@ionic/angular';
import { MenuClipComponent } from 'src/app/components/menu-clip/menu-clip.component';
import { games } from '../../../../assets/json/games';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';
import { channels } from '../../../../assets/json/channels';

moment.locale('es');

@Component({
    selector: 'app-clip',
    templateUrl: './clip.page.html',
    styleUrls: ['./clip.page.scss'],
})
export class ClipPage implements OnInit {

    clips: any = [];
    slideOptions = {
        direction: 'vertical'
    };
    videoElement: any;
    video: HTMLElement;
    isPlaying: any = true;
    games: any = games;
    channels: any = channels;
    lottieConfig = {
        loop: false,
        autoplay: false,
        path: '/assets/animations/like.json',
        autoloadSegments: false
    };
    likes: any = [];
    clip: any;
    query: any = {
        from: '',
        value: ''
    };

    constructor(
        public api: ApiService,
        public elementRef: ElementRef,
        public modalController: ModalController,
        public actvRoute: ActivatedRoute,
        public auth: AuthService,
        public components: ComponentsService,
        private navCtrl: NavController,
        public router: Router
    ) {
        const clipKey = this.actvRoute.snapshot.paramMap.get('clipKey');

        api.getDocument('clips', clipKey).then(data => {
            this.loadClipData(data);

            setTimeout(() => {
                (<HTMLVideoElement>document.getElementsByClassName('clip-' + this.clips[0].id)[0]).play();
            }, 1000);

            this.actvRoute.queryParams
                .subscribe(params => {
                    this.query.from = params.type;
                    if (params.type === 'channel') {
                        this.query.value = this.clips[0].channel.id;
                    } else if (params.type === 'game') {
                        this.query.value = this.clips[0].game.id;
                    }
                }
                );

            api.getRef('clips').ref
                .where(this.query.from, '==', this.query.value)
                .get()
                .then(snapshots => {
                    snapshots.forEach(element => {
                        const clip = element.data();
                        clip.$key = element.id;
                        const checkClip = this.clips.findIndex(search => search.$key === clip.$key);
                        if (checkClip === -1) {
                            this.loadClipData(clip);
                        }
                    });
                });
        });
    }

    ngOnInit() {
    }

    loadClipData(data) {
        const clip = data;

        clip.creationDate = moment(clip.creationDate.toDate()).fromNow();
        const gameId = this.games.findIndex(game => game.id === clip.game);
        clip.game = this.games[gameId];

        const channelId = this.channels.findIndex(collection => collection.id === clip.channel);
        clip.channel = this.channels[channelId];

        this.api.getDocument('users', clip.userKey).then(userData => {
            clip.user = userData;

            this.api.getFollowStatus(clip.userKey)
                .then(followStatus => {
                    clip.user.isFollowed = followStatus;
                });
        });

        this.api.getLikeByUser(clip.$key)
            .then(likeStatus => {
                clip.isLiked = likeStatus;
            });

        clip.id = this.api.makeid(10);

        this.clips.push(clip);
    }

    slideChange(slides) {
        slides.getPreviousIndex().then(index => {
            this.isPlaying = false;
            (<HTMLVideoElement>document.getElementsByClassName('clip-' + this.clips[index].id)[0]).pause();
        });

        slides.getActiveIndex().then(index => {
            this.isPlaying = true;
            (<HTMLVideoElement>document.getElementsByClassName('clip-' + this.clips[index].id)[0]).play();
        });
    }

    changeStatusVideo(id) {
        if (this.isPlaying === true) {
            this.isPlaying = false;
            (<HTMLVideoElement>document.getElementsByClassName('clip-' + id)[0]).pause();
        } else {
            this.isPlaying = true;
            (<HTMLVideoElement>document.getElementsByClassName('clip-' + id)[0]).play();
        }
    }

    handleAnimation(clip, index, anim: any) {
        this.likes.push(anim);

        if (clip.isLiked) {
            setTimeout(() => {
                anim.playSegments([[0, 33]], true);
            }, 100);
        }
    }

    like(index, clip) {
        if (clip.isLiked) {
            this.likes[index].stop();
            clip.likes -= 1;
        } else {
            this.likes[index].playSegments([0, 33], true);
            clip.likes += 1;
        }
        this.api.updateLike(clip);
        clip.isLiked = !clip.isLiked;
    }

    backToProfile() {
        this.navCtrl.back();
    }

    pauseVideo(id) {
        this.isPlaying = true;
        this.changeStatusVideo(id);
    }

    followUser(user) {
        if (user.isFollowed) {
            user.followers -= 1;
        } else {
            user.followers += 1;
        }
        this.api.updateFollowStatus(user);
        user.isFollowed = !user.isFollowed;
    }

    async openComments(clip) {
        if (clip.comments) {
            const modal = await this.modalController.create({
                component: MenuClipComponent,
                cssClass: 'menu-modal menu-clip-modal',
                swipeToClose: true
            });

            return await modal.present();
        }
    }

    async openMenu() {
        const modal = await this.modalController.create({
            component: MenuClipComponent,
            cssClass: 'menu-modal menu-clip-modal',
            swipeToClose: true
        });

        return await modal.present();
    }
}
