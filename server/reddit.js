export default{
    search: function(search){
        console.log('search');
        fetch(
            'http://www.reddit.com/search.json?q=burger'
            )
        .then(res=>res.json())
        .then(data=>console.log(data));
    }
}