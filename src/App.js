import "./App.css";
import React, { useState } from "react";
import Today from "react-live-clock";

function App() {
	let [글제목, 글제목변경] = useState([]);
	let [like, setLike] = useState([]);
	let [modal, setModal] = useState(false);
	let [title, setTitle] = useState(0);
	let [post, setPost] = useState("");
	let [postDate, setPostDate] = useState([]);

	const handlelisted = () => {
		let copy = [...글제목];
		글제목변경(copy.sort());
	};

	const today = <Today format={"YYYY년 MM월 DD일"} />;

	return (
		<div className="App">
			<div className="nav-bar">
				<h2>Blog</h2>
			</div>
			<button onClick={handlelisted}>정렬</button>
			{글제목.map((a, i) => {
				return (
					<div className="list" key={i}>
						<h4
							className="title"
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
									let likeCount = [...like];
									likeCount[i]++;
									setLike(likeCount);
								}}
							>
								❤️
							</span>
							{like[i]}
						</h4>
						<button
							onClick={() => {
								let copy = [...글제목];
								copy.splice(i, 1);
								글제목변경(copy);
								let likeArr = [...like];
								likeArr.splice(i, 1);
								setLike(likeArr);
								let dateArr = [...postDate];
								dateArr.splice(i, 1);
								setPostDate(dateArr);
							}}
						>
							삭제하기
						</button>
						<p className="postDate">{postDate[i]}</p>
					</div>
				);
			})}
			<div className="publish">
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
						let likeArr = [...like];
						likeArr.unshift("");
						setLike(likeArr);
						let dateArr = [...postDate];
						dateArr.unshift(today);
						setPostDate(dateArr);
					}}
				>
					업로드
				</button>
			</div>
			{modal == true ? (
				<Modal title={title} 글제목={글제목} date={postDate} />
			) : null}
		</div>
	);
}

function Modal(props) {
	return (
		<div className="modal">
			<h4>{props.글제목[props.title]}</h4>
			<p>{props.date[props.title]}</p>
			<p>상세내용</p>
			<button>글 수정</button>
		</div>
	);
}

export default App;
