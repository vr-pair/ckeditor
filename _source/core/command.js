﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.command = function( editor, commandDefinition )
{
	this.state = ( 'state' in commandDefinition ) ? commandDefinition.state : CKEDITOR.TRISTATE_OFF;

	this.exec = function( data )
	{
		if ( this.state == CKEDITOR.TRISTATE_DISABLED )
			return false;

		return ( commandDefinition.exec.call( this, editor, data ) !== false );
	};

	CKEDITOR.tools.extend( this, commandDefinition );

	// Call the CKEDITOR.event constructor to initialize this instance.
	CKEDITOR.event.call( this );
};

CKEDITOR.command.prototype =
{
	setState : function( newState )
	{
		// Do nothing if there is no state change.
		if ( this.state == newState )
			return false;

		// Set the new state.
		this.state = newState;

		// Fire the "state" event, so other parts of the code can react to the
		// change.
		this.fire( 'state' );

		return true;
	},

	toggleState : function()
	{
		if ( this.state == CKEDITOR.TRISTATE_OFF )
			this.setState( CKEDITOR.TRISTATE_ON );
		else if ( this.state == CKEDITOR.TRISTATE_ON )
			this.setState( CKEDITOR.TRISTATE_OFF );
	}
}

CKEDITOR.event.implementOn( CKEDITOR.command.prototype );
