import { Component, Input, OnInit } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SpotifyArtist } from '../../models/spotify-artist.model';

@Component({
    selector: 'genre-chart',
    templateUrl: './genre-chart.component.html',
    styleUrls: ['./genre-chart.component.css']
})
export class GenreChartComponent implements OnInit {
    view: any[] = [1000, 700];

    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Number';
    showYAxisLabel = true;
    yAxisLabel = 'Value';
    timeline = true;

    colorScheme = {
		domain: ['#324B4E', '#33706A', '#44957A', '#6FB97C', '#ACDB76', '#F9F871', '#415D6B', '#5C6E87', '#827D9E', '#AD8BAB',
			'#D69BAE', '#627C7F', '#BEFBFF', '#FF8B41', '#D97639', '#2A676E', '#90F8B5', '#57BF80', '#13884E']
	};

    //pie
    showLabels = true;
    explodeSlices = true;
    doughnut = true;

    @Input()
    type: string;

    @Input()
    rawItems: SpotifyArtist[];

    items: ChartItemModel[];

    ngOnInit(): void {
        const chartModels = this.prepareGenreChartModels();
	    this.items = chartModels;
    }

    prepareGenreChartModels(): ChartItemModel[] {
        const result: ChartItemModel[] = [];

	    debugger;

	    if (this.rawItems) {
		    const genres: string[] = [];

		    for (let artist of this.rawItems) {
			    genres.push(...artist.genres);
		    }

		    const aggregatedGenres = genres.reduce((acc, curr) => {
				    if (typeof acc[curr] === 'undefined') {
					    acc[curr] = 1;
				    } else {
					    acc[curr] += 1;
				    }

				    return acc;
			    },
			    {});


		    for (let aggregatedGenre in aggregatedGenres) {
			    if (aggregatedGenres.hasOwnProperty(aggregatedGenre)) {
				    const model = new ChartItemModel();
				    model.name = aggregatedGenre;
				    model.value = this.rawItems.length / aggregatedGenres[aggregatedGenre];

				    result.push(model);
			    }
		    }
	    }

	    return result;
    }


}

class ChartModel {
    name: string;
    series: ChartItemModel[] = [];
}

class ChartItemModel {
    name: string;
    value: number;
}
