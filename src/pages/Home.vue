<template>
    <div>
        <h1>Seat Map</h1>
        <div class="colors">
            <div class="box orange"></div>
            <h3>CARRE OR</h3>
        </div>
        <div class="colors">
            <div class="box red"></div>
            <h3>1ERE CATEGORIE</h3>
        </div>
        <div class="colors">
            <div class="box blue"></div>
            <h3>2EME CATEGORIE</h3>
        </div>
        <div class="colors">
            <div class="box yellow"></div>
            <h3>3EME CATEGORIE</h3>
        </div>
        <div class="colors">
            <div class="box pink"></div>
            <h3>UNIQUE</h3>
        </div>
        <div class="colors">
            <i class="fas fa-male" style="font-size:24px; padding-top:3px;"></i>
            <h3>Reserved</h3>
        </div>
        <div class="colors">
            <i class="fas fa-ban" style="font-size:20px; padding-top:3px;"></i> 
            <h3>Not Available</h3>
        </div>
        <div class="colors">
            <i class="fas fa-euro-sign" style="font-size:20px; padding-top:3px;"></i> 
            <h3>Paid</h3>
        </div>
        <div class="colors">
            <i class="fas fa-ticket-alt" style="font-size:20px; padding-top:3px;"></i>
            <h3>Edited</h3>
        </div>
        <div class="seat-map" style="position: relative;">
            <span class="seat-wrap" v-for="seat in positions" :style="seatPosition(seat)" @click="handleClick(seat)">
                <span class="seat-num">{{seat.Seat}}</span>
                <i v-if="seat.SeatState === 'R'" class="fas fa-male seat-state" style="font-size:8px"></i>
                <i v-if="seat.SeatState === 'I' || seat.SeatState === 'X'" class="fas fa-ban seat-state" style="font-size:8px"></i>
                <i v-if="seat.SeatState === 'P'" class="fas fa-euro-sign seat-state" style="font-size:8px"></i>
                <i v-if="seat.SeatState === 'B'" class="fas fa-ticket-alt seat-state" style="font-size:8px"></i>

                <i v-if="seat.SeatDenominationName === 'FAUTEUIL'" class="fas fa-couch seat" :class="{'orange': orange(seat), 'red': red(seat), 'blue': blue(seat), 'yellow': yellow(seat), 'pink': pink(seat), 'east':getEast(seat), 'north':getNorth(seat), 'west':getWest(seat)}"></i>
                <i v-else class="fas fa-chair seat" :class="{'orange': orange(seat), 'red': red(seat), 'blue': blue(seat), 'yellow': yellow(seat), 'pink': pink(seat), 'east':getEast(seat), 'north':getNorth(seat), 'west':getWest(seat)}"></i>
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
    </div>
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
                left: (seat.pos_x * 70) + 'px',
                top: (seat.pos_y * 30) + 'px',
            }
        },
        textPosition: function(text){
            return {
                position: 'absolute',
                left: (text.pos_x * 70) + 'px',
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
        orange: function(seat){
            if(seat.CategoryName === 'CARRE OR'){
                return true
            }
        },
        red: function(seat){
            if(seat.CategoryName === '1ERE CATEGORIE'){
                return true
            }
        },
        blue: function(seat){
            if(seat.CategoryName === '2EME CATEGORIE'){
                return true
            }
        },
        yellow: function(seat){
            if(seat.CategoryName === '3EME CATEGORIE'){
                return true
            }
        },
        pink: function(seat){
            if(seat.CategoryName === 'UNIQUE'){
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
    width: 300px;
    height: 40px;
    padding: 10px;

    .box{
        width: 16px;
        height: 16px;
        float: left;
        margin: 5px;
    }
    .box.red{
        background: red;
    }
    .box.blue{
        background: blue;
    }
    .box.yellow{
        background: rgb(240, 240, 2);
    }
    .box.orange{
        background: orange;
    }
    .box.pink{
        background: pink;
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
        margin: -35rem -100rem;
    }
    .text{
        margin: -35rem -150rem;
    }
    .seat-state{
        width: 15%;
        padding-left: 1px;
    }
    .seat-num{
        width: 35%;
        float: left;
        font-size: 12px;
        padding-right: 12px;
    }
    .seat{
        width: 50%;
        float: left;
        font-size: 16px;
    }
    .orange{
        color: orange;
    }
    .red{
        color: red;
    }
    .blue{
        color: blue;
    }
    .yellow{
        color: rgb(233, 233, 6);
    }
    .pink{
        color: pink;
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
