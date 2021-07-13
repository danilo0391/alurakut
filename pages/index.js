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
		id: '91827391827319827918237',
		title: 'I hate to wake up early',
		image: 'http://alurakut.vercel.app/capa-comunidade-01.jpg'
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
								id: new Date().toISOString(),
								title: dataOfForm.get('title'),
								image: dataOfForm.get('https://picsum.photos/200/300?198273'),
							}

							const communitiesUpdated = [...communities, community]
							setCommunites(communitiesUpdated);							
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
							name="title" 
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
					<h2 className="smallTitle">My Friends ({favouritePeople.length})</h2>
					<ul>
					{favouritePeople.map((item) => {
						return (
							<li key={item.id}>
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
				<h2 className="smallTitle">Communities ({communities.length})</h2>
					<ul>
						{communities.map((item) => {
							return (
								<li key={item}>
									<a href={`/users/${item.title}`} key={item.title}>
										<img src={item.image} />
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
