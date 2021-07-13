import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSideBar(props) {
	return (
		<Box>
			<img src={`https://github.com/${props.gitHubUser}.png`} style={{ borderRadius: '8px'}}/>
		</Box>
	)
}

export default function Home() {
	const gitHubUser = 'danilo0391';
	const favouritePeople = [
		'CristianMenguer',
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
			</div>
			<div className= "profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">Comunities' People ({favouritePeople.length})</h2>
					<ul>
					{favouritePeople.map((item) => {
						return (
							<li>
								<a href={`/users/${item}`} key={item}>
									<img src={`https://github.com/${item}.png`} />
									<span>{item}</span>
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
