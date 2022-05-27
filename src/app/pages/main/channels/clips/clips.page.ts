import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { channels } from '../../../../../assets/json/channels';

@Component({
    selector: 'app-clips',
    templateUrl: './clips.page.html',
    styleUrls: ['./clips.page.scss'],
})
export class ClipsPage implements OnInit {

    clips: any = [];
    channels: any = channels;
    channel: any;
    channelCount: any = 0;
    loading: any = true;

    constructor(
        public api: ApiService,
        public actvRoute: ActivatedRoute
    ) {
        const channelKey = this.actvRoute.snapshot.paramMap.get('channelKey');

        const channelId = this.channels.findIndex(channel => channel.id === channelKey);
        this.channel = this.channels[channelId];

        api.getRef('clips').ref
            .where('channel', '==', channelKey)
            .get()
            .then(snapshots => {
                this.channelCount = snapshots.size;
            });

        api.getRef('clips').ref
            .where('channel', '==', channelKey)
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
}
