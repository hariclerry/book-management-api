import {body} from 'express-validator/check';

exports.validate = method => {
	switch (method) {
		case 'userRegistration': {
			return [
				body('userName', `User name is required and should have atleast 5 characters`)
					.exists()
					.trim()
					.isLength({ min: 5 }),
				body(
					'email',
					'Email is required and should be valid'
				)
                    .exists()
                    .isEmail()
					.trim()
					.isLength({ min: 5 }),
				body('password', 'Password is required and should have atleast 5 characters')
					.exists()
					.trim()
			]
        }
        case 'userLogin': {
			return [
				body(
					'email',
					'Email is required and should be valid'
				)
                    .exists()
                    .isEmail()
					.trim()
					.isLength({ min: 5 }),
				body('password', 'Password is required and should have atleast 5 characters')
					.exists()
					.trim()
			]
		}
		case 'bookCreation': {
			return [
				body('title', `Title is required`)
					.exists()
					.trim(),
				body(
					'isbn',
					'Isbn is required and should be valid'
				)
                    .exists()
					.trim()
					.isLength({ min: 5 }),
				body('author', 'Author is required and should have atleast 5 characters')
					.exists()
					.trim()
			]
		}	
		default:
			return null
	}
}
