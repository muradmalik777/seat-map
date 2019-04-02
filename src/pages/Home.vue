<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1>Seat Map</h1>
                <div class="colors">
                    <div class="box blue">

                    </div>
                    <h3>Filled</h3>
                </div>
                <div class="colors">
                    <div class="box red">

                    </div>
                    <h3>Available</h3>
                </div>
                <div class="seat-map" style="position: relative;">
                    <span class="seat-wrap" v-for="(item, index) in seats" :key="index" :style="seatPosition(item)" @click="handleClick(item)">
                        <span class="seat-num">{{item.Row}}{{item.Seat}}</span>
                        <i class="fas fa-chair seat" :class="{'filled': item.IsFree === 'O', 'empty': item.IsFree === 'N'}"></i>
                    </span>
                    <v-dialog v-model="dialog" width="500">
                        <v-card v-if="this.selectedSeat">
                            <v-card-title class="headline grey lighten-2" primary-title>Seat Number: {{this.selectedSeat.Seat}}</v-card-title>
                            <v-card-text>
                            <p>Category ID: {{this.selectedSeat.CategoryID}}</p>
                            <p>Floor ID: {{this.selectedSeat.FloorID}}</p>
                            <p>Index: {{this.selectedSeat.IIndex}}</p>
                            <p>Availability: {{this.selectedSeat.IsFree}}</p>
                            <p>Reserve ID: {{this.selectedSeat.ReserveID}}</p>
                            <p>Row Number: {{this.selectedSeat.Row}}</p>
                            <p>Seat Domination ID: {{this.selectedSeat.SeatDominationID}}</p>
                            <p>Seat ID: {{this.selectedSeat.SeatID}}</p>
                            <p>Section ID: {{this.selectedSeat.SectionID}}</p>
                            <p>Orientation: {{this.selectedSeat.orientation}}</p>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat small @click="dialog=false"> Close </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import mapData from '@/resource/mapData.json';
export default {
    name: 'home',
    data: function(){
        return{
            data: mapData,
            seats: mapData.diffgram.NewDataSet.Seats,
            dialog: false,
            selectedSeat: null
        }
    },
    mounted: function(){
        console.log(this.data.diffgram.NewDataSet.Seats)
    },
    methods: {
        seatPosition: function(seat){
            return {
                position: 'absolute',
                left: (seat.pos_x * 3.5) + 'rem',
                top: (seat.pos_y * 1.8) + 'rem',
            }
        },
        handleClick: function(item){
            this.dialog = true
            this.selectedSeat = item
        }
    }
    
}
</script>
<style lang="scss">
h1{
    text-align: center;
}
.v-card{
    .v-card__text{
        p{
            margin: 3px;
        }
    }
}
.colors{
    width: 200px;
    height: 40px;
    padding: 10px;

    .box{
        width: 16px;
        height: 16px;
        float: left;
        margin: 5px;
    }
    .box.red{
        background: rgb(255, 75, 75);
    }
    .box.blue{
        background: rgb(48, 48, 253);
    }
    h3{
        width: fit-content;
        float: left;
        margin: 3px 10px;
    }
}
.seat-map{
    width: 1360px;
    min-height: 115vh;
    margin: auto;
    border: 1px solid grey;
    box-sizing: border-box;

    .seat-wrap{
        cursor: pointer;
        margin: -10rem -35rem;
    }
    .seat-num{
        width: 50%;
        float: left;
        font-size: 12px;
        padding-right:14px; 
    }
    .seat{
        width: 50%;
        float: left;
        font-size: 18px;
    }
    .filled{
        color: rgb(255, 75, 75);
    }
    .empty{
        color: rgb(48, 48, 253);
    }
    .north{
        transform: rotate(180deg)
    }
    .east{
        transform: rotate(270deg)
    }
    .west{
        transform: rotate(90deg)
    }
}
</style>
