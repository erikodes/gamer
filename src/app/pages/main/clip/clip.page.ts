import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { MenuClipComponent } from 'src/app/components/menu-clip/menu-clip.component';
import { games } from "../../../../assets/json/games";
import { ActivatedRoute } from '@angular/router';
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
    slide: any = 0;
    video: HTMLElement;
    isPlaying: any = true;
    games: any;
    lottieConfig = {
        loop: false,
        autoplay: false,
        path: '/assets/animations/like.json',
        autoloadSegments: false
    };
    likes: any = [];
    clip: any;

    constructor(
        public api: ApiService,
        public elementRef: ElementRef,
        public modalController: ModalController,
        public actvRoute: ActivatedRoute
    ) {
        const clipKey = this.actvRoute.snapshot.paramMap.get('clipKey');
        this.games = games;

        api.getDocument('clips', clipKey).then(data => {
            this.clip = data;
            this.clip.creationDate = moment(this.clip.creationDate.toDate()).fromNow();

            const gameId = this.games.findIndex(element => element.id == this.clip.game);
            this.clip.game = this.games[gameId];

            api.getDocument('users', this.clip.userKey).then(data => {
                this.clip.user = data
            })

            api.getLikeByUser(this.clip.$key)
                .then(likeStatus => {
                    this.clip.isLiked = likeStatus;
                })

            this.clips.push(this.clip);
        });
    }

    ngOnInit() {
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

        if (clip.like) {
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

    async openMenu() {
        const modal = await this.modalController.create({
            component: MenuClipComponent,
            cssClass: 'menu-modal menu-clip-modal',
            swipeToClose: true
        });

        return await modal.present();
    }

}
