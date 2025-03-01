import React, { useState } from 'react';
import styled from 'styled-components';

const Frame = styled.section`
	position: relative;
	margin-bottom: 200px;
`;

const Inner = styled.div`
	max-width: 980px;
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
`;

const Subject = styled.div`
	text-align: center;
	color: #3f3c3c;
	max-width: 300px;
	margin: 0 auto;
	margin-top: 30px;
	margin-bottom: 30px;
	font-size: 32px;
	font-weight: 900;
`;

const RegisterFormBlock = styled.div`
	width: 700px;
	height: 700px;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
	margin-top: 180px;
	margin-bottom: 32px;
	padding: 30px;
	display: flex;
	flex-direction: column;
`;

const RowGroup = styled.div`
	font-size: 12px;
	min-width: 600px;
	max-width: 50%;
	margin: 0 auto;
`;

const Label = styled.h3<{ LabelFontS?: string }>`
	margin: 8px 8px 8px;
	height: 20px;
	font-size: ${({ LabelFontS }) => LabelFontS || '14px'};
	font-weight: 700;
`;

const ResponseInput = styled.input<{ EditorBorder?: string; EditorMarginB?: string; EditorShadow?: string }>`
	display: block;
	position: relative;
	width: 100%;
	height: 48px;
	border: ${({ EditorBorder }) => EditorBorder || '1px solid #dadada'};
	border-radius: 10px;
	margin-bottom: ${({ EditorMarginB }) => EditorMarginB || '0px'};
	padding: 10px 110px 10px 14px;
	box-sizing: border-box;
	&:disabled {
		background: #ffffffa6;
	}
	& + & {
		margin-left: 20px;
	}
	&:focus {
		outline: none;
	}
`;

const ResponseInputFrame = styled.div`
	border: 1px solid #eea3bf;
	border-radius: 10px;
	padding: 5px 10px 20px 10px;
`;

const ConfirmDiv = styled.div`
	display: flex;
	margin-top: 15px;
`;

const ConfirmButton = styled.button<{ buttonColor?: string; buttonBackColor?: string; buttonLeft?: string }>`
	width: 295px;
	height: 45px;
	color: ${({ buttonColor }) => buttonColor || '#fff'};
	font-size: 19px;
	font-weight: 900;
	background: ${({ buttonBackColor }) => buttonBackColor || '#EEA3BF'};
	border: 1px solid #eea3bf;
	border-radius: 8px;
	position: absolute;
	left: ${({ buttonLeft }) => buttonLeft || '28%'};
	transform: translate(-50%, 50%);
	text-align: center;
	&:hover {
		opacity: 0.8;
	}
	&:active {
		opacity: 1;
	}
`;

const MessageBoxArea = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;

	justify-content: center;
	align-items: center;
`;

const MessageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 150px;
	width: 40%;
	padding: 20px;
	flex-direction: column;
	min-width: 200px;
	opacity: 1;
	border: solid 1px #bfbfbf;
	border-radius: 10px;
	background-color: white;
	box-shadow: 1px 2px 5px #7c7c7c;
`;
const MessageInnerBox = styled.div`
	flex: 1 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MessageBoxButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 70px;
	height: 30px;
	background-color: #fff;
	opacity: 1;
	border-radius: 8px;
	border: 1.5px solid #eea3bf;
	box-shadow: rgba(150, 143, 152, 0.15) 0 4px 9px;
	box-sizing: border-box;
	color: #666666;
	cursor: pointer;
	display: inline-block;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: normal;

	&:hover {
		border: none;
		background-color: rgba(238, 163, 191, 0.8);
		opacity: 1;
		transform: translateY(0);
		transition-duration: 0.35s;
		color: #fff;
	}
`;

// ---- code
interface Props {
	onConfirm: (data: DataType) => void;
	onCancel: () => void;
}

interface DataType {
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
}
const dataInit: DataType = {
	title: '',
	answerTextO: '',
	answerTextX: '',
	answerTextS: '',
};

function Editor({ onConfirm, onCancel }: Props) {
	const [data, setData] = useState<DataType>(dataInit);
	const [inputError, setInputError] = useState(false);
	function Checker(checkData: DataType) {
		let ans = true;
		const f = (s: string) => s.replaceAll(' ', '').length === 0;
		if (f(checkData.title)) {
			ans = false;
		}

		if (f(checkData.answerTextO)) {
			ans = false;
		}

		if (f(checkData.answerTextS)) {
			ans = false;
		}

		if (f(checkData.answerTextX)) {
			ans = false;
		}

		return ans;
	}

	return (
		<Frame>
			<Inner>
				<RegisterFormBlock>
					<RowGroup>
						<Subject>이슈를 작성해주세요</Subject>
						<Label LabelFontS="18px">제목</Label>
						<ResponseInput
							EditorMarginB="50px"
							EditorBorder="1px solid #EEA3BF"
							type="text"
							value={data.title}
							onChange={(e) => {
								setData({ ...data, title: e.target.value });
							}}
						/>
						<Label LabelFontS="18px">응답</Label>
						<ResponseInputFrame>
							<Label>네</Label>
							<ResponseInput
								type="text"
								value={data.answerTextO}
								onChange={(e) => {
									setData({ ...data, answerTextO: e.target.value });
								}}
							/>
							<Label>글쎄요</Label>
							<ResponseInput
								type="text"
								value={data.answerTextS}
								onChange={(e) => {
									setData({ ...data, answerTextS: e.target.value });
								}}
							/>
							<Label>아니요</Label>
							<ResponseInput
								type="text"
								value={data.answerTextX}
								onChange={(e) => {
									setData({ ...data, answerTextX: e.target.value });
								}}
							/>
						</ResponseInputFrame>
						<ConfirmDiv>
							<ConfirmButton
								onClick={() => {
									if (Checker(data)) {
										onConfirm(data);
									} else {
										setInputError(true);
										setData(dataInit);
									}
								}}
							>
								저장
							</ConfirmButton>
							<ConfirmButton onClick={onCancel} buttonColor="#EEA3BF" buttonBackColor="#ffffff" buttonLeft="71.7%">
								취소
							</ConfirmButton>
						</ConfirmDiv>
					</RowGroup>
				</RegisterFormBlock>
			</Inner>
			{inputError ? (
				<MessageBoxArea>
					<MessageBox>
						<MessageInnerBox>빈 칸을 채워주세요</MessageInnerBox>
						<MessageInnerBox>
							<MessageBoxButton
								onClick={() => {
									setInputError(false);
								}}
							>
								돌아가기
							</MessageBoxButton>
						</MessageInnerBox>
					</MessageBox>
				</MessageBoxArea>
			) : null}
		</Frame>
	);
}

export default Editor;
