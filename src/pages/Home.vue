<template>
    <v-container style="background: #fff;">
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
                    <span class="seat-wrap" v-for="seat in positions" :style="seatPosition(seat)" @click="handleClick(seat)">
                        <span class="seat-num">{{seat.Seat}}</span>
                        <i class="fas fa-chair seat" :class="{'filled': checkIfFilled(seat.SeatID), 'empty': checkIfEmpty(seat.SeatID), 'east':getEast(seat), 'north':getNorth(seat), 'west':getWest(seat)}"></i>
                    </span>
                    <span class="text" v-for="letter in text" :style="textPosition(letter)">
                        {{letter.text}}
                    </span>
                    <v-dialog v-model="dialog" width="500">
                        <v-card v-if="this.selectedSeat">
                            <v-card-title class="headline grey lighten-2" primary-title>Seat Number: {{this.selectedSeat.Row+this.selectedSeat.Seat}}</v-card-title>
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
import positions from '@/resource/positions.json';
import seatdata from '@/resource/seatdata.json';

export default {
    name: 'home',
    data: function(){
        return{
            seatdata: seatdata.diffgram.NewDataSet.Seats,
            positions: positions.diffgram.NewDataSet,
            text: seatdata.diffgram.NewDataSet.Texts,
            dialog: false,
            selectedSeat: null
        }
    },
    mounted: function(){

    },
    methods: {
        seatPosition: function(seat){
            return {
                position: 'absolute',
                left: (seat.pos_x * 50) + 'px',
                top: (seat.pos_y * 30) + 'px',
            }
        },
        textPosition: function(text){
            return {
                position: 'absolute',
                left: (text.pos_x * 50) + 'px',
                top: (text.pos_y * 30) + 'px',
            }
        },
        handleClick: function(item){
            this.dialog = true
            this.selectedSeat = item
        },
        getEast: function(item){
            return item.orientation === 'E' ? true : false
        },
        getWest: function(item){
            return item.orientation === 'W' ? true : false
        },
        getNorth: function(item){
            return item.orientation === 'N' ? true : false
        },
        checkIfFilled: function(id){
            if(this.seatdata.find(item=>item.SeatID===id && item.IsFree==="O")){
                return true
            }
        },
        checkIfEmpty: function(id){
            if(this.seatdata.find(item=>item.SeatID===id && item.IsFree==="N")){
                return true
            }
        },
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
    width: 1560px;
    min-height: 125vh;
    margin: auto;

    .seat-wrap{
        cursor: pointer;
        margin: 1rem -16rem;
    }
    .text{
        margin: 1rem -15rem;
    }
    .seat-num{
        width: 50%;
        float: left;
        font-size: 12px;
        padding-right: 10px;
    }
    .seat{
        width: 50%;
        float: left;
        font-size: 16px;
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
