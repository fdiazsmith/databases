module.exports = {

  hello : function (){
    return "hello from inside action";
  },

  sendHello: function(req, res){
    res.status(200)
    res.json({no_error: 'Internal hello!'})
  }

}
