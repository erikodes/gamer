import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { games } from '../../../../../assets/json/games';

@Component({
    selector: 'app-clips',
    templateUrl: './clips.page.html',
    styleUrls: ['./clips.page.scss'],
})
export class ClipsPage implements OnInit {

    clips: any = [];
    games: any = games;
    game: any;
    gameCount: any = 0;
    loading: any = true;
    saved: any = false;

    constructor(
        public api: ApiService,
        public actvRoute: ActivatedRoute,
        public auth: AuthService
    ) {
        const gameKey = this.actvRoute.snapshot.paramMap.get('gameKey');

        const gameId = this.games.findIndex(game => game.id === gameKey);
        this.game = this.games[gameId];

        api.getRef('users')
            .doc(auth.user)
            .collection('savedGames')
            .doc(gameKey)
            .get()
            .toPromise()
            .then((snapshot) => {
                this.game.isSaved = snapshot.exists;
            }).catch((error: any) => {
                console.log(error);
            });

        api.getRef('clips').ref
            .where('channel', '==', gameKey)
            .get()
            .then(snapshots => {
                this.gameCount = snapshots.size;
            });

        api.getRef('clips').ref
            .where('game', '==', gameKey)
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const clip = element.data();
                    clip.$key = element.id;

                    const url = clip.video.url.split('/');

                    clip.video.url = 'https://res.cloudinary.com/dzvclpwar/video/upload/f_jpg/' + url[6] + '/' + url[7];
                    this.clips.push(clip);
                });

                this.loading = false;
            });
    }

    ngOnInit() {
    }

    updateSave() {
        return new Promise((resolve, reject) => {
            if (this.game.isSaved) {
                this.api.getRef('users')
                    .doc(this.auth.user)
                    .collection('savedGames')
                    .doc(this.game.id)
                    .delete();
                this.game.isSaved = false;
            } else {
                this.api.getRef('users')
                    .doc(this.auth.user)
                    .collection('savedGames')
                    .doc(this.game.id)
                    .set({});
                this.game.isSaved = true;
            }
        });
    }
}
