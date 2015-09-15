#Team Nerdery - Prime Academy Group Project

##Description

#Technical Document

##Server
###Routes
####/Users
The ‘Users’ route file will contain a POST ajax call to create new Users. It will handle passport authentication.
####/Person
The ‘Person” route file will contain all server routing related to searching or editing the Person objects. POST ajax calls will be made for creating a new Person and retrieving a Person or People matching a given set of criteria. A PUT request will be made to update changes made to an existing Person.
Modules


#Client
##Scripts
##Views
##Models:

```
Person Schema: {
	imageURL: string
	email : string
	first name : string
	last name : string
	age: Number
	phoneNumber: string
	twitterHandle: string
	linkedInProfile: string
	interests: string [ ]
	current title : string
	current company : string
	family : {
        spouse: “Mary Antoinette”,
        children: “first born”, “middle child”, “last child”
    }
	workHistory: {
		“The Nerdery”: {
			title: “string
            yearsEmployed: number or string? tbd
            Summary: string
            isCurrentlyEmployed: boolean
        }
    }
}
```