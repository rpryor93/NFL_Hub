$(document).ready(function(){
$('#teamAndPlayers').hide();
var teamID = '';
var playerObject = [];
$('#teamList li').on('click', function(){
    $('#teamAndPlayers').hide();
    console.log($(this).attr('value'));
    teamID = $(this).attr('value');
    $('.empty').empty().remove();
    $('.empty').empty().remove();
    getTeamProfile();

    });


// var teamID = getTeamId();

function getTeamProfile(){
    

    var queryURL = "https://crossorigin.me/http://api.sportradar.us/nfl-ot1/teams/" + teamID + "/profile.json?api_key=gmtbev57jstw8rhuchy34dkj";
    
    console.log(queryURL);
    $.ajax({
        url: queryURL, 
        method: 'GET'
    })
    .done(function(response){
        console.log(response);

        //player data
        $.each(response.players, function(index, value){
            var playerName = response.players[index].name;
            var playerID = response.players[index].id;
            var position = response.players[index].position;
            var player = {
                name: playerName,
                id: playerID,
                pos: position
                };

            playerObject.push(player);
            //seperating players according to their position
            if(position == 'WR' || position == 'LT' || position == 'LG' || position == 'C' || position == 'RG' || position == 'RT' || position == 'TE' || position == 'QB' || position == 'WR' || position == 'RB' || position == 'FB'){
                
                $('<button>') // position offensive
                    .html(playerName)
                    .addClass('boom', 'btn btn-primary')
                    .data('id', playerID)
                    .data('pos', position)
                    .data('position', "offensive")
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#playerData')
                    .addClass('empty')
                    .appendTo('#offensive');

                }
                else{ // position defensive

                    $('<button>')
                    .html( playerName)
                    .addClass('boom', 'btn btn-primary')
                    .data('id', playerID)
                    .data('pos', position)
                    .data('position', "defensive")
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#playerData')
                    .addClass('empty')
                    .appendTo('#defensive');
                }
                            
        });
        console.log(playerObject);
        //teamdata print out
        $('#teamData').html(response.market +' '+response.name);
        $('#teamAlias').html(response.alias);
        $('#coachName').html(response.coaches[2].full_name);
        $('#conferenceName').html(response.conference.name);
        $('#divisionName').html(response.division.name);
        $('#venueName').html(response.venue.name);
        $('#venueLocation').html(response.venue.city + ', ' + response.venue.state);
        $('#venueCapacity').html(response.venue.capacity);
        
        $('#teamAndPlayers').show();

    });

};

//on click to pop up modal
$(document).on('click', '.boom', function(){
   var ID = $(this).data('id');
   var pos = $(this).data('pos');

   var queryURL = "https://crossorigin.me/http://api.sportradar.us/nfl-ot1/players/"+ID+"/profile.json?api_key=gmtbev57jstw8rhuchy34dkj";
   console.log(queryURL);
       $.ajax({url: queryURL, 
           method: 'GET'})
       .done(function(response){
           console.log(response);
           console.log(response.seasons);

            $('.modal-title').html(response.first_name +' '+response.last_name);
            $('.modal-body').empty();
            $('<div>').html("Date of Birth : "+response.birth_date).appendTo('.modal-body');
            $('<div>').html("Birth Place : "+response.birth_place).appendTo('.modal-body');
            $('<div>').html("Jersey : "+response.jersey).appendTo('.modal-body');
            $('<div>').html("weight : "+response.weight+" lbs.").appendTo('.modal-body');
            $('<div>').html("Position : "+ response.position).appendTo('.modal-body');

                var recentYear;
                var gamesPlayed;
                var passingYards;
                var rushingYards;
                var touchdowns;
                var fumbles;
                var receiving;
                var receptions;
                var playerPosition;
                var tackles;
                var sacks;
                var assists;
                var interceptions;
                function resetData(){
                    recentYear = 0;
                    gamesPlayed = 0;
                    passingYards = 0;
                    rushingYards = 0;
                    touchdowns = 0;
                    fumbles = 0;
                    receiving = 0;
                    receptions = 0;
                    tackles = 0;
                    sacks = 0;
                    assists = 0;
                    interceptions = 0;

                };

            if(pos == 'WR'){
                for(i=0; i<(response.seasons).length; i++){
                recentYear = response.seasons[(response.seasons).length-1].year;

                    for(j=0; j<(response.seasons[(response.seasons).length-1].teams).length; j++){
                        gamesPlayed = response.seasons[(response.seasons).length-1].teams[0].statistics.games_played;
                        // rushingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.avg_yards;
                        touchdowns = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.touchdowns;
                        // fumbles = response.seasons[(response.seasons).length-1].teams[0].statistics.fumbles.fumbles;
                        // passingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.passing.avg_yards;
                        receiving = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.avg_yards;
                        // touchdowns =response.seasons[(response.seasons).length-1].teams[0].statistics.passing.touchdowns + response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.touchdowns
                        receptions = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.receptions;
                    }
                    
                }
                console.log(recentYear);
                console.log(gamesPlayed);
                $('#stat-body').empty();
                $('#stat-title').empty();
                $('#stat-title').html('Stats from : ' + recentYear);
                $('<div>').html('Games Played : '+gamesPlayed).appendTo('#stat-body');
                // $('<div>').html('Average Passing Yards: '+ passingYards).appendTo('#stat-body');
                // $('<div>').html('Average Rushing Yards: '+ rushingYards).appendTo('#stat-body');
                $('<div>').html('Total Touchdowns: '+touchdowns).appendTo('#stat-body');
                // $('<div>').html('Total Fumbles: '+fumbles).appendTo('#stat-body');
                $('<div>').html('Average Receiving yards: '+ receiving).appendTo('#stat-body');
                $('<div>').html('Total Receptions: '+ receptions).appendTo('#stat-body');

                resetData();

            }else if(pos == 'TE'){
                for(i=0; i<(response.seasons).length; i++){
                recentYear = response.seasons[(response.seasons).length-1].year;

                    for(j=0; j<(response.seasons[(response.seasons).length-1].teams).length; j++){
                        gamesPlayed = response.seasons[(response.seasons).length-1].teams[0].statistics.games_played;
                        // rushingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.avg_yards;
                        touchdowns = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.touchdowns;
                        fumbles = response.seasons[(response.seasons).length-1].teams[0].statistics.fumbles.fumbles;
                        // passingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.passing.avg_yards;
                        receiving = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.avg_yards;
                        // touchdowns =response.seasons[(response.seasons).length-1].teams[0].statistics.passing.touchdowns + response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.touchdowns
                        receptions = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.receptions;
                    }
                }
                console.log(recentYear);
                console.log(gamesPlayed);
                $('#stat-body').empty();
                $('#stat-title').empty();
                $('#stat-title').html('Stats from : ' + recentYear);
                $('<div>').html('Games Played : '+gamesPlayed).appendTo('#stat-body');
                // $('<div>').html('Average Passing Yards: '+ passingYards).appendTo('#stat-body');
                // $('<div>').html('Average Rushing Yards: '+ rushingYards).appendTo('#stat-body');
                $('<div>').html('Total Touchdowns: '+touchdowns).appendTo('#stat-body');
                $('<div>').html('Total Fumbles: '+fumbles).appendTo('#stat-body');
                $('<div>').html('Average Receiving yards: '+ receiving).appendTo('#stat-body');
                $('<div>').html('Total Receptions: '+ receptions).appendTo('#stat-body');

                resetData();

            }else if(pos == 'QB'){
                 for(i=0; i<(response.seasons).length; i++){
                recentYear = response.seasons[(response.seasons).length-1].year;

                    for(j=0; j<(response.seasons[(response.seasons).length-1].teams).length; j++){
                        gamesPlayed = response.seasons[(response.seasons).length-1].teams[0].statistics.games_played;
                        rushingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.avg_yards;
                        // touchdowns = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.touchdowns;
                        fumbles = response.seasons[(response.seasons).length-1].teams[0].statistics.fumbles.fumbles;
                        // passingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.passing.avg_yards;
                        // receiving = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.avg_yards;
                        touchdowns =response.seasons[(response.seasons).length-1].teams[0].statistics.passing.touchdowns;
                        // receptions = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.receptions;
                    }
                    
                }
                console.log(recentYear);
                console.log(gamesPlayed);
                $('#stat-body').empty();
                $('#stat-title').empty();
                $('#stat-title').html('Stats from : ' + recentYear);
                $('<div>').html('Games Played : '+gamesPlayed).appendTo('#stat-body');
                // $('<div>').html('Average Passing Yards: '+ passingYards).appendTo('#stat-body');
                $('<div>').html('Average Rushing Yards: '+ rushingYards).appendTo('#stat-body');
                $('<div>').html('Total Touchdowns: '+touchdowns).appendTo('#stat-body');
                $('<div>').html('Total Fumbles: '+fumbles).appendTo('#stat-body');
                // $('<div>').html('Average Receiving yards: '+ receiving).appendTo('#stat-body');
                // $('<div>').html('Total Receptions: '+ receptions).appendTo('#stat-body');

                resetData();


            }else if(pos == 'RB'){
                 for(i=0; i<(response.seasons).length; i++){
                recentYear = response.seasons[(response.seasons).length-1].year;

                    for(j=0; j<(response.seasons[(response.seasons).length-1].teams).length; j++){
                        gamesPlayed = response.seasons[(response.seasons).length-1].teams[0].statistics.games_played;
                        rushingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.avg_yards;
                        touchdowns = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.touchdowns;
                        fumbles = response.seasons[(response.seasons).length-1].teams[0].statistics.fumbles.fumbles;
                        // passingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.passing.avg_yards;
                        receiving = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.avg_yards;
                        // touchdowns =response.seasons[(response.seasons).length-1].teams[0].statistics.passing.touchdowns;
                        receptions = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.receptions;
                    }
                    
                }
                console.log(recentYear);
                console.log(gamesPlayed);
                $('#stat-body').empty();
                $('#stat-title').empty();
                $('#stat-title').html('Stats from : ' + recentYear);
                $('<div>').html('Games Played : '+gamesPlayed).appendTo('#stat-body');
                // $('<div>').html('Average Passing Yards: '+ passingYards).appendTo('#stat-body');
                $('<div>').html('Average Rushing Yards: '+ rushingYards).appendTo('#stat-body');
                $('<div>').html('Total Touchdowns: '+touchdowns).appendTo('#stat-body');
                $('<div>').html('Total Fumbles: '+fumbles).appendTo('#stat-body');
                $('<div>').html('Average Receiving yards: '+ receiving).appendTo('#stat-body');
                $('<div>').html('Total Receptions: '+ receptions).appendTo('#stat-body');

                resetData();


            }else if(pos == 'FS'){
                 for(i=0; i<(response.seasons).length; i++){
                recentYear = response.seasons[(response.seasons).length-1].year;

                    for(j=0; j<(response.seasons[(response.seasons).length-1].teams).length; j++){
                        gamesPlayed = response.seasons[(response.seasons).length-1].teams[0].statistics.games_played;
                        // rushingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.avg_yards;
                        // touchdowns = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.touchdowns;
                        fumbles = response.seasons[(response.seasons).length-1].teams[0].statistics.fumbles.forced_fumbles;
                        // passingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.passing.avg_yards;
                        // receiving = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.avg_yards;
                        // touchdowns =response.seasons[(response.seasons).length-1].teams[0].statistics.passing.touchdowns;
                        // receptions = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.receptions;
                        tackles = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.tackles;
                        sacks = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.sacks;
                        assists = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.assists;
                        interceptions = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.interceptions;
                    }
                    
                }
                console.log(recentYear);
                console.log(gamesPlayed);
                $('#stat-body').empty();
                $('#stat-title').empty();
                $('#stat-title').html('Stats from : ' + recentYear);
                $('<div>').html('Games Played : '+gamesPlayed).appendTo('#stat-body');
                // $('<div>').html('Average Passing Yards: '+ passingYards).appendTo('#stat-body');
                // $('<div>').html('Average Rushing Yards: '+ rushingYards).appendTo('#stat-body');
                // $('<div>').html('Total Touchdowns: '+touchdowns).appendTo('#stat-body');
                $('<div>').html('Total Fumbles: '+fumbles).appendTo('#stat-body');
                // $('<div>').html('Average Receiving yards: '+ receiving).appendTo('#stat-body');
                $('<div>').html('Total interceptions: '+ interceptions).appendTo('#stat-body');
                $('<div>').html('Total Sacks: '+ sacks).appendTo('#stat-body');
                $('<div>').html('Total Tackles: '+ tackles).appendTo('#stat-body');
                $('<div>').html('Total Assists: '+ assists).appendTo('#stat-body');




                resetData();


            }else if(pos == 'T' || pos == 'FS' || pos == 'CB' || pos == 'DE' || pos == 'DT' || pos == 'DE' || pos == 'WLB' || pos == 'MLB' || pos == 'SLB' || pos == 'SS'){
                 for(i=0; i<(response.seasons).length; i++){
                recentYear = response.seasons[(response.seasons).length-1].year;

                    for(j=0; j<(response.seasons[(response.seasons).length-1].teams).length; j++){
                        gamesPlayed = response.seasons[(response.seasons).length-1].teams[0].statistics.games_played;
                        // rushingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.rushing.avg_yards;
                        // touchdowns = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.touchdowns;
                        fumbles = response.seasons[(response.seasons).length-1].teams[0].statistics.fumbles.fumbles;
                        // passingYards = response.seasons[(response.seasons).length-1].teams[0].statistics.passing.avg_yards;
                        // receiving = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.avg_yards;
                        // touchdowns =response.seasons[(response.seasons).length-1].teams[0].statistics.passing.touchdowns;
                        // receptions = response.seasons[(response.seasons).length-1].teams[0].statistics.receiving.receptions;
                        tackles = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.tackles;
                        sacks = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.sacks;
                        assists = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.assists;
                        interceptions = response.seasons[(response.seasons).length-1].teams[0].statistics.defense.interceptions;
                    }
                    
                }
                console.log(recentYear);
                console.log(gamesPlayed);
                $('#stat-body').empty();
                $('#stat-title').empty();
                $('#stat-title').html('Stats from : ' + recentYear);
                $('<div>').html('Games Played : '+gamesPlayed).appendTo('#stat-body');
                // $('<div>').html('Average Passing Yards: '+ passingYards).appendTo('#stat-body');
                // $('<div>').html('Average Rushing Yards: '+ rushingYards).appendTo('#stat-body');
                // $('<div>').html('Total Touchdowns: '+touchdowns).appendTo('#stat-body');
                $('<div>').html('Total Fumbles: '+fumbles).appendTo('#stat-body');
                // $('<div>').html('Average Receiving yards: '+ receiving).appendTo('#stat-body');
                $('<div>').html('Total interceptions: '+ interceptions).appendTo('#stat-body');
                $('<div>').html('Total Sacks: '+ sacks).appendTo('#stat-body');
                $('<div>').html('Total Tackles: '+ tackles).appendTo('#stat-body');
                $('<div>').html('Total Assists: '+ assists).appendTo('#stat-body');




                resetData();
            };
        });
});
});