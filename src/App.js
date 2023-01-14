import "./App.css";
import { useState } from "react";

function App() {
	let [글제목, 글제목변경] = useState([
		"남자코트 추천",
		"강남 우동 맛집",
		"파이썬 독학",
	]);
	let [like, setLike] = useState([0, 0, 0]);
	let [modal, setModal] = useState(false);
	let [title, setTitle] = useState(0);
	let [post, setPost] = useState("");
	let [postDate, setPostDate] = useState("");

	const handleChange = () => {
		let copy = [...글제목];
		copy[0] = "여자코트 추천";
		글제목변경(copy);
	};

	const handlelisted = () => {
		let copy = [...글제목];
		글제목변경(copy.sort());
	};

	const postingDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();
		return `${year}년 ${month}월 ${day}일`;
	};
	return (
		<div className="App">
			<div className="nav-bar">
				<h4>Blog</h4>
			</div>
			<button onClick={handlelisted}>정렬</button>
			{글제목.map((a, i) => {
				return (
					<div className="list" key={i}>
						<h4
							onClick={() => {
								{
									setModal(!modal);
									setTitle(i);
								}
							}}
						>
							{글제목[i]}
							<span
								onClick={(e) => {
									e.stopPropagation();
									let copyArr = [...like];
									copyArr[i] = copyArr[i] + 1;
									setLike(copyArr);
								}}
							>
								❤️
							</span>
							{like[i]}
						</h4>
						<button onClick={handleChange}>수정하기</button>
						<button
							onClick={() => {
								let copy = [...글제목];
								copy.splice(i, 1);
								글제목변경(copy);
							}}
						>
							삭제하기
						</button>
						<p>{postingDate}</p>
					</div>
				);
			})}
			<input
				onChange={(e) => {
					setPost(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					let copy = [...글제목];
					copy.unshift(post);
					글제목변경(copy);
				}}
			>
				업로드
			</button>
			{modal == true ? (
				<Modal title={title} 글제목={글제목} 함수={handleChange} />
			) : null}
		</div>
	);
}

function Modal(props) {
	return (
		<div className="modal">
			<h4>{props.글제목[props.title]}</h4>
			<p>날짜</p>
			<p>상세내용</p>
			<button onClick={props.함수}>글 수정</button>
		</div>
	);
}

export default App;
