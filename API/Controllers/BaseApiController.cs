using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController: ControllerBase
{
    private IMediator _mediator;
    protected IMediator Mediator => _mediator ??= 
        HttpContext.RequestServices.GetService<IMediator>();

    /*protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);
        if (result.IsSuccess && result.Value == null)
            return NotFound();
        return BadRequest(result.Error);
    }*/
    
    
    //prov solution as tutorial didn't solve this at this stage for me xxx
    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result == null)
            return BadRequest("Result object is null."); 

        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);

        if (result.IsSuccess && result.Value == null)
            return NotFound();

        return BadRequest(result.Error);
    }

}