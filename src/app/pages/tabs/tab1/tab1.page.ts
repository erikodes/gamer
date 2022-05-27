/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { MenuClipComponent } from 'src/app/components/menu-clip/menu-clip.component';
import { games } from '../../../../assets/json/games';
import { channels } from '../../../../assets/json/channels';
import { ComponentsService } from 'src/app/services/components/components.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
moment.locale('es');

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    clips: any = [];
    slideOptions = {
        direction: 'vertical'
    };
    videoElement: any;
    video: HTMLElement;
    isPlaying: any = true;
    games: any;
    channels: any = channels;
    lottieConfig = {
        loop: false,
        autoplay: false,
        path: '/assets/animations/like.json',
        autoloadSegments: false,
    };
    likes: any = [];

    constructor(
        public api: ApiService,
        public elementRef: ElementRef,
        public modalController: ModalController,
        public components: ComponentsService,
        public actvRoute: ActivatedRoute,
        public auth: AuthService
    ) {
        this.games = games;

        api.getRef('clips').ref
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const clip = element.data();
                    clip.$key = element.id;
                    clip.creationDate = moment(clip.creationDate.toDate()).fromNow();
                    const gameId = this.games.findIndex(game => game.id === clip.game);
                    clip.game = this.games[gameId];

                    const channelId = this.channels.findIndex(channel => channel.id === clip.channel);
                    clip.channel = this.channels[channelId];

                    api.getDocument('users', clip.userKey).then(data => {
                        clip.user = data;

                        api.getFollowStatus(clip.userKey)
                            .then(followStatus => {
                                clip.user.isFollowed = followStatus;
                            });
                    });

                    api.getLikeByUser(clip.$key)
                        .then(likeStatus => {
                            clip.isLiked = likeStatus;
                        });

                    clip.id = api.makeid(10);

                    this.clips.push(clip);
                });

                setTimeout(() => {
                    (<HTMLVideoElement>document.getElementsByClassName('clip-' + this.clips[0].id)[0]).play();
                }, 1000);
            });
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

    followUser(user) {
        if (user.isFollowed) {
            user.followers -= 1;
        } else {
            user.followers += 1;
        }
        this.api.updateFollowStatus(user);
        user.isFollowed = !user.isFollowed;
    }

    pauseVideo(id) {
        this.isPlaying = true;
        this.changeStatusVideo(id);
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
