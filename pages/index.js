import React from 'react';

import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";


function ProfileSideBar(props) {
	return (
		<Box as="aside">
			<img src={`https://github.com/${props.gitHubUser}.png`} style={{ borderRadius: '8px'}}/>
			<hr />
		<p>
			<a className="boxLink" href={`https://github.com/${props.gitHubUser}`}>
			@{props.gitHubUser}
			</a>
		</p>
			
			<hr />

			<AlurakutProfileSidebarMenuDefault />
		</Box>
	)
}

export default function Home() {
	const gitHubUser = 'danilo0391';
	const [communities, setCommunites] = React.useState([{
		// id: '91827391827319827918237',
		// title: 'I hate to wake up early',
		// image: 'http://alurakut.vercel.app/capa-comunidade-01.jpg'
	}]);
	// const communities = ['Alurakut'];
	const favouritePeople = [
		'Altemir-Ap',
		'apontejaj',
		'RogerioSobrinho',
		'juunegreiros',
		'omariosouto',
		'peas'
	]

	const [followers, setFollowers] = React.useState([]);

	React.useEffect( () => {
		fetch('https://api.github.com/users/danilo0391/followers')
		.then((serverResponse) => {
			console.log(serverResponse);
			return serverResponse.json();
		})
		.then((fullResponse) => {
			console.log(fullResponse)
			setFollowers(fullResponse);
		})

		//API GraphQL
		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': '64fe005077e7120ebc2692de9b63bf',
			},
			body: JSON.stringify({ "query": `query {
				allCommunities {
					title
					id
					imageUrl
					creatorSlug
				}
			}`})
		})
		.then((response) => response.json())
		.then((fullResponse) => {
			const datoCommunites = fullResponse.data.allCommunities;
			console.log(datoCommunites);
			setCommunites(datoCommunites)
		})
	}, [])

	return (
		<>
		<AlurakutMenu />
		<MainGrid>
			<div className= "profileArea" style={{ gridArea: 'profileArea' }} >
				<ProfileSideBar gitHubUser={gitHubUser}/>
			</div>
			<div className= "welcomeArea" style={{ gridArea: 'welcomeArea' }} >
				<Box>
					<h1 className="title">
						Welcome
					</h1>

					<OrkutNostalgicIconSet />
				</Box>

				<Box>
					<h2 className="subTitle">What would you like to do?</h2>
					<form onSubmit={function handleSubmitCommunity(e) {
							e.preventDefault();
							const dataOfForm = new FormData(e.target);

							console.log('Campo: ',dataOfForm.get('title'));
							console.log('Campo: ',dataOfForm.get('image'));

							const community = {
								title: dataOfForm.get('title'),
								imageUrl: dataOfForm.get('image'),
								creatorSlug: gitHubUser
							}

							fetch('/api/communities', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(community)
							})
							.then(async (response) => {
								const data = await response.json();
								console.log(data.registerCreated);
								const community = data.registerCreated;
								const communitiesUpdated = [...communities, community];
								setCommunites(communitiesUpdated)
							})

							// const communitiesUpdated = [...communities, community]
							// setCommunites(communitiesUpdated);							
						}} >
							<div>
								<input 
								placeholder="What is your community's name?" 
								name="title" 
								aria-label="What is your community's name"
								type="text"/>
							</div>
					<div>
							<input 
							placeholder="Paste your picture's URL to use as cover" 
							name="image" 
							aria-label="Paste your picture's URL to use as cover"/>
					</div>
					
					<button>
						Create Community
					</button>
					</form>
				</Box>
			</div>
			<div className= "profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						My Friends ({favouritePeople.length})</h2>
					<ul>
					{favouritePeople.map((item) => {
						return (
							
							<li key={item}>
								<a href={`/users/${item}`} key={item}>
									<img src={`https://github.com/${item}.png`} />
									<span>{item}</span>
								</a>
						</li>
							)
					})}
					</ul>
				</ProfileRelationsBoxWrapper>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Communities ({communities.length})
					</h2>
					<ul>
						{communities.map((item) => {
							return (
								<li key={item.id}>
									<a href={`/communities/${item.id}`} key={item.title}>
										<img src={item.imageUrl} />
										<span>{item.title}</span>
									</a>
							</li>
								)
						})}
						</ul>
				</ProfileRelationsBoxWrapper>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Followers ({followers.length})
					</h2>
					<ul>
						{followers.map((item) => {
							return (
								<li key={item.id}>
									<a href={`/followers/${item.login}`} key={item.login}>
										<img src={`${item.html_url}.png`} />
										<span>{item.title}</span>
									</a>
							</li>
								)
						})}
						</ul>
				</ProfileRelationsBoxWrapper>
			</div>
		</MainGrid>
		</>
	)
}
