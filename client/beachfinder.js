/*if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
}

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
} 

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
} */

BeachPreferences = new Meteor.Collection("beachPreferences");

Meteor.subscribe("beachPreferences");
 
Template.beachPreferences.items = function(){
  //console.log(BeachPreferences.find({},{sort:{'submittedOn':-1}}));
    return BeachPreferences.find({},{sort:{'submittedOn':-1}});

   // return BlogPosts.find({author: this.userId}, {sort: {date: -1}, limit: 10});
    //Meteor.subscribe("beachPreferences");
};

Template.addBeachPreference.events({
    'click input.add-beach-preference' : function(event){
        event.preventDefault();
        var beachPreferenceText = document.getElementById("beachPreferenceText").value;
        Meteor.call("addBeachPreference",beachPreferenceText,function(error , preferenceId){
          console.log('added preference with Id .. '+preferenceId+' and value of '+beachPreferenceText);
        });
        document.getElementById("beachPreferenceText").value = "";
 
    }
});

// When the remove button is clicked on a chat message, delete
// that message.
Template.beachPreference.events({
  'click .delete': function (e) {
    console.log('clicked');
    e.preventDefault();
    Meteor.call('deleteBeachPreference', {_id: this._id})
  },
  'click .edit': function(e) {
    e.preventDefault();

    var prefVal = $('#pref-'+this._id);
    prefVal.replaceWith('<input class="beach-pref" type="text" id="pref-'+this._id+'" value="'+this.beachPreferenceText+'"/>');
    console.log(prefVal);
    var beachPreferenceText = this.beachPreferenceText;
    console.log(this.beachPreferenceText);
   
  },
  'blur .beach-pref': function(e) {
    var prefVal = $('#pref-'+this._id);
    var beachPref = prefVal.val();
    //console.log(beachPreferenceText);
   // Meteor.call("editBeachPreference",beachPreferenceText);

    var prefVal = $('#pref-'+this._id);
    prefVal.replaceWith('<span class="beach-pref" id="pref-'+this._id+'">'+beachPref+'</span>');

    Meteor.call("editBeachPreference",beachPref, this._id);
  }
});
