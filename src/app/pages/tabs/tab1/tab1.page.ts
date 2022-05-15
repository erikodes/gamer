import { Component, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { MenuClipComponent } from 'src/app/components/menu-clip/menu-clip.component';
import { games } from '../../../../assets/json/games';
import { categories } from '../../../../assets/json/categories';
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
    slide: any = 0;
    video: HTMLElement;
    isPlaying: any = true;
    games: any;
    categories: any;
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
        this.categories = categories;

        api.getRef('clips').ref
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const clip = element.data();
                    clip.$key = element.id;
                    clip.creationDate = moment(clip.creationDate.toDate()).fromNow();
                    const gameId = this.games.findIndex(element => element.id === clip.game);
                    clip.game = this.games[gameId];

                    const categoryId = this.categories.findIndex(element => element.id === clip.category);
                    clip.category = this.categories[categoryId];

                    api.getDocument('users', clip.userKey).then(data => {
                        clip.user = data;

                        api.getFollowStatus(clip.userKey)
                            .then(followStatus => {
                                clip.user.isFollowed = followStatus;
                            })
                    });

                    api.getLikeByUser(clip.$key)
                        .then(likeStatus => {
                            clip.isLiked = likeStatus;
                        });

                    this.clips.push(clip);
                });

                setTimeout(() => {
                    (<HTMLVideoElement>document.getElementById('video-0')).play();
                }, 1000);
            });
    }

    ionViewWillLeave() {
        console.log('a');

    }

    slideChange(slides) {
        slides.getPreviousIndex().then(index => {
            this.isPlaying = false;
            (<HTMLVideoElement>document.getElementById('video-' + index)).pause();
        });

        slides.getActiveIndex().then(index => {
            this.slide = index;
            this.isPlaying = true;
            (<HTMLVideoElement>document.getElementById('video-' + this.slide)).play();
        });
    }

    changeStatusVideo(index) {
        if (this.isPlaying === true) {
            this.isPlaying = false;
            (<HTMLVideoElement>document.getElementById('video-' + index)).pause();
        } else {
            this.isPlaying = true;
            (<HTMLVideoElement>document.getElementById('video-' + index)).play();
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
