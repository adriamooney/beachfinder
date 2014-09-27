BeachPreferences = new Meteor.Collection("beachPreferences");
 
Meteor.startup(function () {
    // code to run on server at startup
});
 
Meteor.methods({
  addBeachPreference : function(beachPreferenceText){
    console.log('Adding Beach Preference');
    var preferenceId = BeachPreferences.insert({
          beachPreferenceText : beachPreferenceText,
          submittedOn: new Date(),
          submittedBy : Meteor.userId()
      });
    return preferenceId;
  },
  deleteBeachPreference: function(pref) {
    BeachPreferences.remove(pref);
  },
  editBeachPreference: function(beachPref, id) {
    BeachPreferences.update(
      {_id: id},
      {$set: {'beachPreferenceText': beachPref}}
    );

    //Players.update({_id: player._id}, {$set: {score: random_score}});
  }
});

Meteor.publish("beachPreferences", function(id) {
    //return BeachPreferences.find({'submittedBy': this.userId}); 
    return BeachPreferences.find({submittedBy: this.userId}, {sort: {date: -1}}); 
});


/* Things to at the beach:

surf
paddleboard
parasail
powerboat/tubing
jetski
snorkel
scuba dive
hike
tidepools
swim
float in the water
sunbathe
relax and read
build sand castles
watch beautiful people
party (crowded beach)
be alone (secluded beach)
line fish
harpoon fish
windsurf
kayak
see animals
sail
booze cruise
nightlife
romantic restaurants

*/
